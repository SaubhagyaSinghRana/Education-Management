export interface Fees {
    _id:string;
  studentId: {
    _id:string;
    name:string; };
  amount: string;
  dueDate: string;
  paidDate: string;
  status: "active" | "inactive" | "pending" | "deleted";
  paymentMode: "cash" | "online";
}