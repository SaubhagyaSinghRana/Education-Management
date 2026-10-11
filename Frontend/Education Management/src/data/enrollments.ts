export interface Enrollments {
    _id:string;
    enrollmentNumber:string;
  studentId:{
    _id:string;
    name:string;
  }
  classId:{
    _id:string;
    name:string;
    section:string;
  };
  enrollmentDate: string;
  status: "active" | "inactive" | "pending" | "deleted";
}

