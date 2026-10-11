import { z } from "zod";

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

export const objectIdSchema = z.object({
  id: objectId,
});
export const createEnrollmentSchema = z.object({
  enrollmentNumber:z.string().min(3),
  studentId:objectId,
  classId:objectId,
  enrollmentDate: z.coerce.date(),
  status: z.enum(["active", "inactive", "pending", "deleted"]).default("pending"),
});

export const updateEnrollmentsSchema = createEnrollmentSchema.partial();