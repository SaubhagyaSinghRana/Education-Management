

export interface Student {
  _id: string;
  name: string;
  email: string;
  phone: string;
  fatherName: string;
  motherName: string;
  rollNo: string;
  classId: {
    _id: string;
    name: string;
    section: string;
  };
  address: string;
status: | "active" | "inactive" | "pending" | "deleted"; }