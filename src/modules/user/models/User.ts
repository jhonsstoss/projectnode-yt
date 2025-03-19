import mongoose, { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

// Interface para o documento do usuário
export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
}

// Schema do Mongoose
const userSchema = new mongoose.Schema<IUser>({
  _id: { type: String, default: () => uuidv4() },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Model
export const User = mongoose.model<IUser>('User', userSchema);