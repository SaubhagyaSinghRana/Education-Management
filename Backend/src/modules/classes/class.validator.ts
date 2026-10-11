import { z } from "zod";

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

export const objectIdSchema = z.object({
  id: objectId,
});
export const createClassSchema = z.object({
  name: z.string().min(2),
  section: z.string().min(1),
  status: z.enum(["active", "inactive", "pending"]).default("pending"),
});

export const updateClassSchema = createClassSchema.partial();