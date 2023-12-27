import { Schema, model, Document, Types } from 'mongoose';

interface UserTransactionHistory {
  userId: Types.ObjectId;
  transactionIds: Types.ObjectId[];
}

interface UserTransactionHistoryDocument extends UserTransactionHistory, Document {}

const userTransactionHistorySchema = new Schema<UserTransactionHistoryDocument>({
  userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  transactionIds: [{ type: Schema.Types.ObjectId, ref: 'transactions', required: true }],
});

const UserTransactionHistoryModel = model<UserTransactionHistoryDocument>(
  'users_transaction_histories',
  userTransactionHistorySchema
);

export default UserTransactionHistoryModel;
