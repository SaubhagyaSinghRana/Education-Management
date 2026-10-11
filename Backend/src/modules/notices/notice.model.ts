import mongoose, { Schema, Document, Model } from "mongoose";

export interface INotice extends Document {
  title: string;
  message: string;
  audience: string;
  createdBy: string;
  createdAt: Date;
}

const noticeSchema: Schema<INotice> = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    audience: {
      type: String,
      required: true,
      enum: ["admin", "teacher", "student", "all"],
    },

    createdBy: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Notice: Model<INotice> = mongoose.model<INotice>(
  "Notice",
  noticeSchema
);

export default Notice;