import { Schema, model, Document } from 'mongoose';

export interface Transaction {
  senderId: string;
  receiverId: string;
  amount: number;
}

interface TransactionDocument extends Transaction, Document {}

const transactionSchema = new Schema<TransactionDocument>({
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  amount: { type: Number, required: true },
});

const TransactionModel = model<TransactionDocument>('transactions', transactionSchema);

export default TransactionModel;
