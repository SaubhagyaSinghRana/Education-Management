import { z } from "zod";

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

export const objectIdSchema = z.object({
  id: objectId,
});

export const createMarksSchema = z.object({
  examId: objectId,

  studentId: objectId,

  subjectId: objectId,

  marksObtained: z.number().min(0),

  grade: z.string().min(1),

  remarks: z.string().optional(),
});




export const updateMarksSchema = createMarksSchema.partial();