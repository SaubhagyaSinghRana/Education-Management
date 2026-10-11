import { Response } from "express";
import { Chat } from "./chat.model";
import { AuthRequest } from "../auth/auth.middleware";
import User from "../auth/user.model";
import { onlineUsers } from "./chat.socket";

export const getChatUsers = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const currentUserId = req.user?.userId;

    if (!currentUserId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const users = await User.find({
      _id: { $ne: currentUserId },
      status: "active",
    }).select("_id name email role");

    const chatUsers = {
      users: users.map((user) => ({
        _id: user._id,
        name: user.name,  
        email: user.email,
      role: user.role,
      isOnline :  onlineUsers.has(user._id.toString())
      })),
      
    }

    return res.status(200).json({
      success: true,
      data: chatUsers,
    });
  } catch (error: any) {
    console.error("Get chat users error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get chat users",
    });
  }
};


export const getChatMessages = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user?.userId;

    if (!currentUserId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const messages = await Chat.find({
      $or: [
        {
          senderId: currentUserId,
          receiverId: userId,
        },
        {
          senderId: userId,
          receiverId: currentUserId,
        },
      ],
    } as any).sort({ createdAt: 1 });

    return res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    console.error("Get chat messages error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get messages",
    });
  }
};