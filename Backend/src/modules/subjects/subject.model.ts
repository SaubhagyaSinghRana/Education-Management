import mongoose, { Schema, Document, Types, Model } from "mongoose";

export interface ISubject extends Document {
  name: string;
  code: string;
  status: "active" | "inactive" | "pending" | "deleted";
}

const subjectSchema: Schema<ISubject> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    code: {
      type: String,
      required: true,
      unique: true,
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

const Subject: Model<ISubject> = mongoose.model<ISubject>(
  "Subject",
  subjectSchema
);

export default Subject;