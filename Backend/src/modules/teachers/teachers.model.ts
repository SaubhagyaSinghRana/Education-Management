import mongoose, { Schema, Document, Types, Model } from "mongoose";

export interface ITeacher extends Document {
  name: string;
  email: string;
  phone: string;
  subjectIds: Types.ObjectId[];
  classIds: Types.ObjectId[];
  joiningDate: Date;
  status: "active" | "inactive" | "pending" | "deleted";
}

const teacherSchema: Schema<ITeacher> = new Schema(
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

    subjectIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Subject",
      },
    ],

    classIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Class",
      },
    ],

    joiningDate: {
      type: Date,
      required: true,
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

const Teacher: Model<ITeacher> = mongoose.model<ITeacher>(
  "Teacher",
  teacherSchema
);

export default Teacher;