import mongoose, { Schema, Document, Types, Model } from "mongoose";

export interface IMarks extends Document {
  examId: Types.ObjectId;
  studentId: Types.ObjectId;  
    subjectId: Types.ObjectId;
    marksObtained: number;
    grade: string;
    remarks?: string;
  
}

const marksSchema: Schema<IMarks> = new Schema(
  {
    examId: {
      type: Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },

    studentId: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

        subjectId: {
          type: Schema.Types.ObjectId,
          ref: "Subject",
          required: true,
        },

        marksObtained: {
          type: Number,
          required: true,
        },

        grade: {
          type: String,
          required: true,
        },

        remarks: {
          type: String,
        },
      },
  
  
  {
    timestamps: true,
  }
);

const Marks: Model<IMarks> = mongoose.model<IMarks>(
  "Marks",
  marksSchema
);

export default Marks;