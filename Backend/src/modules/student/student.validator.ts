import { z } from "zod";

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

export const objectIdSchema = z.object({
  id: objectId,
});

export const createStudentSchema = z.object({
  name: z.string().min(3),
  email: z.email(),
  phone: z.string().length(10),
  rollNo: z.number(),
  fatherName: z.string().min(3),
  motherName: z.string().min(3),
  classId:objectId,
  address: z.string().min(3),
  status: z.enum(["active", "inactive", "pending", "deleted"]).default("pending"),
});

export const updateStudentSchema = createStudentSchema.partial();