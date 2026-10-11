import { Router } from "express";
import {
  createAttendance,
  getAttendance,
  getStudentAttendance,
  getMyAttendance,
  updateAttendance,
  deleteAttendance
} from "./attendance.controller";
import { authorize } from "../middleware/role.middleware";
import { objectIdSchema, createAttendanceSchema,updateAttendanceSchema } from "./attendance.validator";
import { validate } from "../middleware/validation.middleware"

import { auth } from "../auth/auth.middleware";

const router: Router = Router();

//admin use
router.post(
  "/",
  auth,
  authorize("admin", "teacher"),
  validate(createAttendanceSchema),
  createAttendance
);

router.get("/",  getAttendance);
router.get(
  "/my-attendance",
  auth,
  authorize("student"),
  getMyAttendance
);

router.get(
  "/:id",
  auth,
  validate({
    params: objectIdSchema,
  }),
  getStudentAttendance
);

router.patch(
  "/:id",
  auth,
  authorize("admin", "teacher"),
  validate({
    params: objectIdSchema,
    body: updateAttendanceSchema,
  }),
  updateAttendance
);
router.delete(
  "/:id",
  auth,
  authorize("admin", "teacher"),
  validate({
    params: objectIdSchema,
  }),
  deleteAttendance
);


export default router;