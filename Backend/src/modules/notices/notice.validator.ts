import { z } from "zod";
const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

export const objectIdSchema = z.object({
  id: objectId,
});
export const createNoticeSchema = z.object({
  title: z.string().min(3),
  message: z.string().min(5),
  audience: z.enum([ "teacher", "student", "all"]),
  createdBy: z.string().min(3),
});

export const updateNoticeSchema = createNoticeSchema.partial();