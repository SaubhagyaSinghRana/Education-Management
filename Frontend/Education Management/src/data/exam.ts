export interface Exam {
    _id:string;
  title: string;
  examType:  
  | "Unit Test"
  | "Monthly"
  | "Half Yearly"
  | "Final"
  | "Practical";
   
  classId: {
    _id:string;
    name:string;
  };
  subjectId: {
    _id:string;
    name:string;
  }
  examDate: Date;
  startTime: string;
  endTime: string;
  totalMarks: number;
  passingMarks: number;
  roomNumber?: string;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";}