import { z } from "zod";

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

export const objectIdSchema = z.object({
  id: objectId,
});
export const createFeesSchema = z.object({
  studentIds: objectId,
  amount: z.number().positive(),
  dueDate: z.coerce.date(),
  paidDate: z.coerce.date().optional(),
  status: z.enum(["active", "inactive", "pending", "deleted"]).default("pending"),
  paymentMode: z.enum(["cash", "online"]),
});

export const updateFeesSchema = createFeesSchema.partial();
