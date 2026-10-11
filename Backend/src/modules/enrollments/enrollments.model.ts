import mongoose, { Schema, Document, Types, Model } from "mongoose";

export interface IEnrollment extends Document {
  enrollmentNumber:string;
  studentId: Types.ObjectId;
  classId: Types.ObjectId;
  enrollmentDate: Date;
  status: "active" | "inactive" | "pending" | "deleted";
}

const enrollmentSchema: Schema<IEnrollment> = new Schema(
  {
    enrollmentNumber: {
      type: String,
      required: true,
    },
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    classId: {
      type: Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },

    enrollmentDate: {
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

const Enrollment:Model<IEnrollment>= mongoose.model<IEnrollment>(
  "Enrollment",
  enrollmentSchema
);

export default Enrollment;