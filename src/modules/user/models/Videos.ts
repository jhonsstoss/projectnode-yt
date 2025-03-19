import mongoose, { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IVideo extends Document {
  _id: string;
  title: string;
  description: string;
  user_id: string;
}

const videoSchema = new mongoose.Schema<IVideo>({
  _id: { type: String, default: () => uuidv4() },
  title: { type: String, required: true },
  description: { type: String, required: true },
  user_id: { type: String, required: true, ref: 'User' }
});

export const Video = mongoose.model<IVideo>('Video', videoSchema);