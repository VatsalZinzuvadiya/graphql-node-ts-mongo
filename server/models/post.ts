import mongoose, { Schema, Document, Types } from "mongoose";
const config = require('../../config');

export interface IPost extends Document {
  id: string;
  title: string;
  content: string;
  author: Types.ObjectId;
}

const PostSchema: Schema = new Schema<IPost>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model<IPost>(config.mongoDb.post, PostSchema);
