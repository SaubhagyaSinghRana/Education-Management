export interface Marks  {
    _id:string;
  examId:{
    _id:string;
    title:string;
    examType:string;} 
  
  studentId:{
    _id:string;
    name:string
  };  
    subjectId:{
        _id:string;
        name:string;
    };
    marksObtained: string;
    grade: string;
    remarks?: string;

}