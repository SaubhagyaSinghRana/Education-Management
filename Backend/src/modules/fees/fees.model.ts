import mongoose, { Schema, Document, Types, Model } from "mongoose";

export interface IFees extends Document {
  studentId: Types.ObjectId;
  amount: number;
  dueDate: Date;
  paidDate: Date;
  status: "active" | "inactive" | "pending" | "deleted";
  paymentMode: "cash" | "online";
}

const feesSchema: Schema<IFees> = new Schema(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    dueDate: {
      type: Date,
      required: true,
    },

    paidDate: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: ["active", "inactive", "pending", "deleted"],
      default: "pending",
      required: true,
    },

    paymentMode: {
      type: String,
      enum: ["cash", "online"],
      default: "cash",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Fees: Model<IFees> = mongoose.model<IFees>("Fees", feesSchema);

export default Fees;