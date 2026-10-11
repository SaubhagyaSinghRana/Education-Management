import { z } from "zod";

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

export const objectIdSchema = z.object({
  id: objectId,
});
export const createSubjectSchema = z.object({
  name: z.string().min(2),
  code: z.string().min(2),
  status: z.enum(["active", "inactive", "pending", "deleted"]).default("pending"),
});

export const updateSubjectSchema = createSubjectSchema.partial();