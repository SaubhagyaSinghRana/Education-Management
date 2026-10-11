import { Request, Response } from "express";
import { GoogleGenAI } from "@google/genai";
console.log("AI_KEY EXISTS:", !!process.env.AI_KEY);
console.log("AI_KEY LENGTH:", process.env.AI_KEY?.length);


// const ai = new GoogleGenAI({
//   apiKey: process.env.AI_KEY as string,
// });

// Gemini chats store karenge
const userChats = new Map<string, any>();

export const chatWithAI = async (req: Request, res: Response) => {
  try {
    console.log("AI REQUEST:", req.body);

    const { message, userId } = req.body;
    const ai = new GoogleGenAI({
  apiKey: process.env.AI_KEY as string,
});

    if (!message?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    let chat = userChats.get(userId);

    if (!chat) {
      console.log("Creating new Gemini chat for:", userId);

      chat = ai.chats.create({
        model: "gemini-3.1-flash-lite",
      });

      userChats.set(userId, chat);
    }

    console.log("Sending message to Gemini...");

    const stream = await chat.sendMessageStream({
      message: message.trim(),
    });

    res.setHeader(
      "Content-Type",
      "text/plain; charset=utf-8"
    );

    res.setHeader(
      "Cache-Control",
      "no-cache"
    );

    for await (const chunk of stream) {
      if (chunk.text) {
        res.write(chunk.text);
      }
    }

    res.end();

  } catch (error) {
    console.error("AI response error:", error);

    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "AI response failed",
      });
    } else {
      res.end();
    }
  }
};