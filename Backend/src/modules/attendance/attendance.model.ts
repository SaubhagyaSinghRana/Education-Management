import mongoose, { Schema, Document, Types, Model } from "mongoose";

export interface IAttendance extends Document {
  studentId: Types.ObjectId;
  classId: Types.ObjectId;
  date: Date;
  status: "present" | "absent" | "leave";
  markedBy: Types.ObjectId;
}

const attendanceSchema: Schema<IAttendance> = new Schema(
  {
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

    date: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["present", "absent", "leave"],
      required: true,
      default: "present",
    },

    markedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Attendance: Model<IAttendance> = mongoose.model<IAttendance>(
  "Attendance",
  attendanceSchema
);

export default Attendance;