import { Request, Response } from "express";
import Subject from "./subject.model";

// =========================
// CREATE SUBJECT
// =========================

export const createSubject = async (
  req: Request,
  res: Response
) => {
  try {
    const subject = await Subject.create(req.body);

    res.status(201).json({
      success: true,
      data: subject,
    });

  } catch (error: any) {
    console.error("Create subject error:", error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// =========================
// GET SUBJECTS
// =========================

export const getSubjects = async (
  req: Request,
  res: Response
) => {
  try {
    const subjects = await Subject.find();

    res.status(200).json({
      success: true,
      data: subjects,
    });

  } catch (error: any) {
    console.error("Get subjects error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// =========================
// UPDATE SUBJECT
// =========================

export const updateSubject = async (
  req: Request,
  res: Response
) => {
  try {
    const subject = await Subject.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    res.status(200).json({
      success: true,
      data: subject,
    });

  } catch (error: any) {
    console.error("Update subject error:", error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// =========================
// DELETE SUBJECT
// =========================

export const deleteSubject = async (
  req: Request,
  res: Response
) => {
  try {
    const subject = await Subject.findByIdAndDelete(
      req.params.id
    );

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Subject deleted successfully",
    });

  } catch (error: any) {
    console.error("Delete subject error:", error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};