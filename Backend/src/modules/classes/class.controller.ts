import { Request, Response } from "express";
import Class from "./classes.model";

export const createClass = async (
  req: Request,
  res: Response
) => {
  try {

      const existingClass = await Class.findOne({
      name: req.body.name,
      section: req.body.section,

    });

    if (existingClass) {
      return res.status(400).json({
        success: false,
        message: "Class already exists",
      });
    }
    const newClass = await Class.create(req.body);
      

    res.status(201).json({
      success: true,
      data: newClass
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Filed Error"
    });
  }
};


export const getClasses = async (
  req: Request,
  res: Response
) => {
  try {
    const classes = await Class.find();
     

    res.status(200).json({
      success: true,
      data: classes
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};
export const getClassesById = async (
  req: Request,
  res: Response
) => {
  try {
    const classes = await Class.findById(req.params.id);
     

    res.status(200).json({
      success: true,
      data: classes
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};


export const updateClass = async (
  req: Request,
  res: Response
) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    );

    if (!updatedClass) {
      return res.status(404).json({
        success: false,
        message: "Class not found"
      });
    }

    res.status(200).json({
      success: true,
      data: updatedClass
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};


export const deleteClass = async (
  req: Request,
  res: Response
) => {
  try {
    const deletedClass = await Class.findByIdAndDelete(
      req.params.id
    );

    if (!deletedClass) {
      return res.status(404).json({
        success: false,
        message: "Class not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Class deleted successfully"
    });

  } catch (error:any) {
    res.status(400).json({
      success: false,
      message: error.errores ||"invaild filed"
      
    });
  } 
};