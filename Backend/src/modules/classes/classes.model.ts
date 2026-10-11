import mongoose, { Schema, Document, Types, Model } from "mongoose";

export interface IClass extends Document {
  name: string;
  section: string;
  courseName?: string;
  status: "active" | "inactive" | "pending" | "deleted";
}

const classSchema: Schema<IClass> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    section: {
      type: String,
      required: true,
      trim: true,
    },

    courseName: {
      type: String,
      trim: true,
    },

   

    status: {
      type: String,
      enum: ["active", "inactive", "pending", "deleted"],
      default: "pending",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Class:Model<IClass> = mongoose.model<IClass>("Class", classSchema);

export default Class;