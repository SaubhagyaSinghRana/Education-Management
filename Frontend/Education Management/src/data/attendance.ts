
export interface Attendance {
    _id:string;
    studentId:{
        _id:string;
        name:string;
    };
  classId:{
    _id:string;
    name:string;
    section:string;
  };
  date: string;
  status: "present" | "absent" | "leave";
  markedBy:{
    _id:string;
    name:string;
  };
}
