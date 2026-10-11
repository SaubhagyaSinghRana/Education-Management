import { Request, Response } from "express";
import Teacher from "./teachers.model";


export const createTeacher = async (
  req: Request,
  res: Response
) => {
  try {

    const teacher = await Teacher.create(
      req.body
    );
    res.status(201).json({
      success: true,
      message: "Teacher created successfully",
      data: teacher
    });



  } catch (error) {

    res.status(400).json({
      success: false,
      message: error
    });


  }
};




9
export const getTeachers = async (
  req: Request,
  res: Response
) => {

  try {

    const teachers = await Teacher.find().populate("subjectIds").populate("classIds");

    res.status(200).json({
      success: true,
      data: teachers
    });


  } catch (error) {

    res.status(400).json({
      success: false,
      message: "filed Error"
    });

  }

};





export const getTeacherById = async (
  req: Request,
  res: Response
) => {

  try {

    const teacher = await Teacher.findById(
      req.params.id
    ).populate("subjectIds")
      .populate("classIds");


    if (!teacher) {

      return res.status(404).json({
        success: false,
        message: "Teacher not found"
      });

    }


    res.status(200).json({
      success: true,
      data: teacher
    });


  } catch (error) {

    res.status(400).json({
      success: false,
      message: "Filed Error"
    });

  }

};

export const updateTeacher = async (
  req: Request,
  res: Response
) => {

  try {

    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    ).populate("subjectIds")
      .populate("classIds");


    if (!teacher) {

      return res.status(404).json({
        success: false,
        message: "Teacher not found"
      });

    }


    res.status(200).json({
      success: true,
      message: "Teacher updated successfully",
      data: teacher
    });


  } catch (error) {

    res.status(400).json({
      success: false,
      message: "Filed Error"
    });

  }

};





export const deleteTeacher = async (
  req: Request,
  res: Response
) => {

  try {

    const teacher = await Teacher.findByIdAndDelete(
      req.params.id
    );


    if (!teacher) {

      return res.status(404).json({
        success: false,
        message: "Teacher not found"
      });

    }


    res.status(200).json({
      success: true,
      message: "Teacher deleted successfully"
    });


  } catch (error) {

    res.status(400).json({
      success: false,
      message: "Filed Error"
    });

  }

};