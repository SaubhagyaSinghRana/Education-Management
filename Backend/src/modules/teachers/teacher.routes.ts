import { Router } from "express";
import {
  createTeacher,
  getTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
} from "./teacher.controller";

import { auth } from "../auth/auth.middleware";
import { authorize } from "../middleware/role.middleware";
import {validate} from"../middleware/validation.middleware";
import {objectIdSchema,updateTeacherSchema,createTeacherSchema} from"./teacher.validator";

const router = Router();
//admin api
router.post(
  "/",
  // auth,
  // authorize("admin"), 
  validate(createTeacherSchema),
  createTeacher
);
router.patch(
  "/:id",
  // auth,
  // authorize("admin"),
   validate({objectIdSchema,updateTeacherSchema}),
  updateTeacher
);

router.delete(
  "/:id",
  // auth,
  // authorize("admin"),
   validate(objectIdSchema),
  deleteTeacher
);
//admin and teacher api

router.get(
  "/",
  // auth,
  // authorize("admin", "teacher"),
  getTeachers
);

router.get(
  "/:id",
  auth,
  authorize("admin", "teacher"), validate(objectIdSchema),
  getTeacherById
);



export default router;