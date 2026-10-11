import { z } from "zod";
const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

export const objectIdSchema = z.object({
  id: objectId,
});
export const createExamSchema = z.object({
  title: z.string().min(2, "Title is required"),
  examType: z.enum(["Unit Test", "Monthly", "Half Yearly", "Final", "Practical"]),
  classId: objectId,
  subjectId: objectId,
  examDate: z.coerce.date(),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  totalMarks: z.number().min(1, "Total marks must be greater than 0"),
  passingMarks: z.number().min(0, "Passing marks cannot be negative"),
  roomNumber: z.string().optional(),
  status: z.enum(["upcoming", "ongoing", "completed", "cancelled"]).optional(),
});

export const updateExamSchema = createExamSchema.partial();