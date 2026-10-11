import { Request, Response } from "express";
import Student from "./student.model";


export const createStudent = async (
  req: Request,
  res: Response
) => {
  try {
    const existingStudent = await Student.findOne({
      email: req.body.email,


    });

    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Student already exists",
      });
    }

    const student = await Student.create(
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: student
    });


  }

  catch (error: any) {

    res.status(400).json({
      success: false,
      message: error.errors || "filed error"
    });

  }

};




export const getStudents = async (
  req: Request,
  res: Response
) => {
  try {

    const students = await Student.find().populate("classId");

    res.status(200).json({
      success: true,
      data: students
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: "Filed Error"
    }); 

  }

};





export const getStudentById = async (
  req: Request,
  res: Response
) => {

  try {

    const student = await Student.findById(
      req.params.id
    ).populate("classId");


    if (!student) {

      return res.status(404).json({
        success: false,
        message: "Student not found"
      });

    }


    res.status(200).json({
      success: true,
      data: student
    });


  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server Error"
    });

  }

};





export const updateStudent = async (
  req: Request,
  res: Response
) => {

  try {

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    ).populate("classId");


    if (!student) {

      return res.status(404).json({
        success: false,
        message: "Student not found"
      });

    }


    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: student
    });


  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server Error"
    });

  }

};





export const deleteStudent = async (
  req: Request,
  res: Response
) => {

  try {

    const student = await Student.findByIdAndDelete(
      req.params.id
    );


    if (!student) {

      return res.status(404).json({
        success: false,
        message: "Student not found"
      });

    }


    res.status(200).json({
      success: true,
      message: "Student deleted successfully"
    });


  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server Error"
    });

  }

};