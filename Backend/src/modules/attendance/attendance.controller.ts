import { Request, Response } from "express";
import Attendance from "./attendance.model";
import User from "../auth/user.model";
import { AuthRequest } from "../auth/auth.middleware";

// Create Attendance
export const createAttendance = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { studentId, classId, date, status } = req.body;

    if (!req.user?.userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const attendance = await Attendance.create({
      studentId,
      classId,
      date,
      status,
      markedBy: req.user.userId,
    });

    return res.status(201).json({
      success: true,
      data: attendance,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Attendance
export const getAttendance = async (req: Request, res: Response) => {
  try {
    const { classId, date, studentId } = req.query as {
      classId?: string;
      date?: string;
      studentId?: string;
    };

    const filter: any = {};

    if (classId) filter.classId = classId;
    if (date) filter.date = date;
    if (studentId) filter.studentId = studentId;

    const attendance = await Attendance.find(filter)
      .populate("studentId")
      .populate("classId")
      .populate("markedBy");

    return res.status(200).json({
      success: true,
      data: attendance,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Logged-in Student Attendance
export const getMyAttendance = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const user = await User.findById(req.user?.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role !== "student") {
      return res.status(403).json({
        success: false,
        message: "Only student can access this attendance",
      });
    }

    if (!user.studentId) {
      return res.status(404).json({
        success: false,
        message: "Student profile not linked with user",
      });
    }

    const attendance = await Attendance.find({
      studentId: user.studentId,
    })
      .populate("studentId")
      .populate("classId")
      .populate("markedBy")
      .sort({ date: -1 });

    return res.status(200).json({
      success: true,
      data: attendance,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Attendance By Student Id
export const getStudentAttendance = async (
  req: Request,
  res: Response
) => {
  try {
    const studentId = req.params.id as string;

    const attendance = await Attendance.find({
      studentId,
    })
      .populate("studentId")
      .populate("classId")
      .populate("markedBy");

    return res.status(200).json({
      success: true,
      data: attendance,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Attendance
export const updateAttendance = async (
  req: Request,
  res: Response
) => {
  try {
    const attendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Attendance updated successfully",
      data: attendance,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Attendance
export const deleteAttendance = async (
  req: Request,
  res: Response
) => {
  try {
    const attendance = await Attendance.findByIdAndDelete(
      req.params.id
    );

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Attendance deleted successfully",
      data: attendance,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};