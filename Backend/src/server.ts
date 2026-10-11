import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http"

import authRoutes from "./modules/auth/auth.routes";
import feesRoutes from "./modules/fees/fees.routes";
import studentRoutes from "./modules/student/student.routes";
import teacherRoutes from "./modules/teachers/teacher.routes";
import attendanceRoutes from "./modules/attendance/attendance.routes";
import classRoutes from "./modules/classes/class.routes";
import subjectRoutes from "./modules/subjects/subject.routes";
import examRoutes from "./modules/exams/exam.routes";
import enrollmentRoutes from "./modules/enrollments/enrollment.routes";
import marksRoutes from "./modules/marks/marks.routes";
import noticeRoutes from "./modules/notices/notice.routes";
import chatRoutes from "./modules/chat/chat.routes";
import aiRoutes from "./modules/ai/ai.router";
import { Server } from "socket.io";
import { registerChatSocket } from "./modules/chat/chat.socket";

dotenv.config();


const app = express();

const server = http.createServer(app);

// CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  })
);

export const io = new Server(server,{"cors": {
    "origin": "*",
    "methods": ["GET", "POST", "PATCH", "PUT", "DELETE"]
  }});
  registerChatSocket(io);

app.use(express.json());


// API ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/fees", feesRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/class", classRoutes);
app.use("/api/subject", subjectRoutes);
app.use("/api/exam", examRoutes);
app.use("/api/enrollment", enrollmentRoutes);
app.use("/api/marks", marksRoutes);
app.use("/api/notice", noticeRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/ai", aiRoutes);





// PORT
const PORT = process.env.PORT || 5000;


// DATABASE + SERVER
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("MongoDB connected successfully");

    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });