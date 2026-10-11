import { Request, Response } from "express";
import User from "../modules/auth/user.model";

export const createUser = async (
  req: Request,
  res: Response
) => {
  try {
    const user =
      await User.create(req.body);

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    console.log("CREATE USER ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUsers = async (
  req: Request,
  res: Response
) => {
  try {
    const users =
      await User.find();

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getUserById = async (
  req: Request,
  res: Response
) => {
  try {
    const user =
      await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
) => {
  try {
    const user =
      await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    console.log("CREATE USER ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
) => {
  try {
    const user =
      await User.findByIdAndDelete(
        req.params.id
      );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};