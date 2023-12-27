import { connectToRabbitMQ, publishMessage } from '../utils/rabbitmq';
import UserModel from '../models/userModel';
import { Transaction } from '../models/transactionModel';
import TransactionModel from '../models/transactionModel';
import UserTransactionHistoryModel from '../models/userTransactionHistoryModel';

export const createTransaction = async (data: Transaction) => {
  try {
    const { senderId, receiverId, amount } = data;

    // Create a new transaction
    const transaction = new TransactionModel({ senderId, receiverId, amount });
    const result = await transaction.save();

    // Update sender's balance and transaction history
    await updateUser(senderId, -amount, transaction._id);

    // Update receiver's balance and transaction history
    await updateUser(receiverId, amount, transaction._id);

    // Sending message to the transactions queue
    const rabbitMQConnection = await connectToRabbitMQ();
    const channel = await rabbitMQConnection.createChannel();
    const QUEUE_NAME = process.env.RABBITMQ_QUEUE_NAME || 'transactions';
    await publishMessage(channel, QUEUE_NAME, result);

    return result;
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw error;
  }
};

const updateUser = async (userId: string, amount: number, transactionId: string) => {
  try {
    // Update user's balance
    await UserModel.findByIdAndUpdate(userId, { $inc: { balance: amount } }, { new: true });

    // Update user's transaction history
    await UserTransactionHistoryModel.findOneAndUpdate(
      { userId },
      { $push: { transactionIds: transactionId } },
      { upsert: true, new: true }
    );
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};
