import mongoose, { Schema, Document, Types,Model } from "mongoose";

export interface IStudent extends Document {
  name: string;
  email: string;
  phone: string;
  rollNo: number;
  fatherName:string;
  motherName:string;
  classId: Types.ObjectId;
  address: string;
  status: "active" | "inactive" | "pending" | "deleted";
}

const studentSchema: Schema<IStudent> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 10,
      trim: true,
    },

    rollNo: {
      type: Number,
      required: true,
      unique: true,
    },
fatherName: {
      type: String,
      required: true,
      trim: true,
    },
    motherName: {
      type: String,
      required: true,
      trim: true,
    },
    classId: { 
      type: Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },

   

    address: {
      type: String,
      required: true,
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

const Student:Model<IStudent> = mongoose.model<IStudent>("Student", studentSchema);

export default Student;