import { z } from "zod";

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

export const objectIdSchema = z.object({
  id: objectId,
});
export const createAttendanceSchema = z.object({
  studentId: objectId,
  classId: objectId,
  date: z.coerce.date(),
  status: z.enum(["present", "absent", "leave"]).default("present"),
  markedBy: objectId,
});

export const updateAttendanceSchema = createAttendanceSchema.partial();