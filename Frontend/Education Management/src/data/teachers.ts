export interface Teacher{
  _id:string;
  name: string;
  email: string;
  phone: string;
  subjectIds:{  
  _id:string;
   name:string;
   }[];
  classIds: {
    _id: string;
    name: string;
    section: string;
  }[];
  joiningDate: string;
  status: "active" | "inactive" | "pending" | "deleted";
}
