import { Request, Response } from "express";
import Marks from "./marks.model";

export const createMarks = async (
  req: Request,
  res: Response
) => {
  try {
    const marks = await Marks.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Marks added successfully",
      data: marks,
    });

  } catch (error: any) {

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export const getAllMarks = async (
  req: Request,
  res: Response
) => {
  try {

    const marks = await Marks.find()
      .populate("examId")
      .populate("studentId")
      .populate("subjectId");
    return res.status(200).json({
      success: true,
      count: marks.length,
      data: marks,
    });    


  } catch (error: any) {

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export const getMarksById = async (
  req: Request,
  res: Response
) => {
  try {

    const marks = await Marks.findById(req.params.id)
      .populate("examId")
      .populate("studentId")
      .populate("subjectId");


    if (!marks) {
      return res.status(404).json({
        success: false,
        message: "Marks not found",
      });
    }


    return res.status(200).json({
      success: true,
      data: marks,
    });


  } catch (error: any) {

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export const updateMarks = async (
  req: Request,
  res: Response
) => {
  try {

    const marks = await Marks.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );


    if (!marks) {
      return res.status(404).json({
        success: false,
        message: "Marks not found",
      });
    }


    return res.status(200).json({
      success: true,
      message: "Marks updated successfully",
      data: marks,
    });


  } catch (error: any) {


    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }


    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export const deleteMarks = async (
  req: Request,
  res: Response
) => {
  try {

    const marks = await Marks.findByIdAndDelete(
      req.params.id
    );


    if (!marks) {
      return res.status(404).json({
        success: false,
        message: "Marks not found",
      });
    }


    return res.status(200).json({
      success: true,
      message: "Marks deleted successfully",
    });


  } catch (error: any) {

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};