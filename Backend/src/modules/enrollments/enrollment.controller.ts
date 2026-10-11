import { Request, Response } from "express";
import Enrollment from "./enrollments.model";

export const createEnrollment = async (
  req: Request,
  res: Response
) => {
  try {
    const enrollment = await Enrollment.create(req.body);

    const populatedEnrollment =
      await Enrollment.findById(enrollment._id)
        .populate("studentId")
        .populate("classId");

   return res.status(201).json({
      success: true,
      data: populatedEnrollment
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};
export const getEnrollments = async (
  req: Request,
  res: Response
) => {
  try {

    const enrollments = await Enrollment.find(
    )
    .populate("studentId")
    .populate("classId")


    res.status(200).json({
      success: true,
      data: enrollments
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

export const getStudentEnrollments = async (
  req: Request,
  res: Response
) => {
  try {
    const studentId = req.params.id as string;

    const enrollments = await Enrollment.find({
    studentId,
    })
    .populate("studentId")
    .populate("classId")


    res.status(200).json({
      success: true,
      data: enrollments
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};


export const deleteEnrollment = async (
  req: Request,
  res: Response
) => {
  try {
    const enrollment = await Enrollment.findByIdAndDelete(
      req.params.id
    );


    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: "Enrollment not found"
      });
    }


    res.status(200).json({
      success: true,
      message: "Enrollment deleted successfully"
    });


  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Server Error"
    });
  }
};