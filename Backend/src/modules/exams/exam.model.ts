import mongoose, { Schema, Document, Types, Model } from "mongoose";

export interface IExam extends Document {
  title: string;
  examType:
    | "Unit Test"
    | "Monthly"
    | "Half Yearly"
    | "Final"
    | "Practical";
  classId: Types.ObjectId;
  subjectId: Types.ObjectId;
  examDate: Date;
  startTime: string;
  endTime: string;
  totalMarks: number;
  passingMarks: number;
  roomNumber?: string;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
}

const examSchema: Schema<IExam> = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    examType: {
      type: String,
      enum: [
        "Unit Test",
        "Monthly",
        "Half Yearly",
        "Final",
        "Practical",
      ],
      required: true,
    },

    classId: {
      type: Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },

    subjectId: {
      type: Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },

    examDate: {
      type: Date,
      required: true,
    },

    startTime: {
      type: String,
      required: true,
    },

    endTime: {
      type: String,
      required: true,
    },

    totalMarks: {
      type: Number,
      required: true,
      min: 1,
    },

    passingMarks: {
      type: Number,
      required: true,
      min: 0,
    },

    roomNumber: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed", "cancelled"],
      default: "upcoming",
    },
  },
  {
    timestamps: true,
  }
);

const Exam: Model<IExam> = mongoose.model<IExam>("Exam", examSchema);

export default Exam;