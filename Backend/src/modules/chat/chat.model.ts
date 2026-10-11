import mongoose,{Document,Schema,Types,Model} from "mongoose";

export interface IChat extends Document{
  senderId:Types.ObjectId;
  receiverId:Types.ObjectId;
  message:string;
  isRead:boolean;
  createdAt:Date;
}


const chatSchema:Schema<IChat>=new Schema({
  senderId:{
    type:Schema.Types.ObjectId, 
    ref:"User",
    required:true,
  },    
    receiverId:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true,
}, 
message:{                      
type:String,
required:true,
},
isRead:{
type:Boolean,
default:false,},
},
  {
    timestamps: true,
  }
);

export const Chat: Model<IChat> = mongoose.model<IChat>("Chat", chatSchema);
        
        