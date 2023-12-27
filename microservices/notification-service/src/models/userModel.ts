import { Schema, model, Document } from 'mongoose';

interface User {
  name: string;
  balance: number;
}

interface UserDocument extends User, Document {}

const userSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  balance: { type: Number, required: true },
});

const UserModel = model<UserDocument>('users', userSchema);

export default UserModel;
