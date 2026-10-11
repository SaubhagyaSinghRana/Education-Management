export interface Subject {
  _id:string;
  name: string;
  code: string;
  status: "active" | "inactive" | "pending" | "deleted";
}

