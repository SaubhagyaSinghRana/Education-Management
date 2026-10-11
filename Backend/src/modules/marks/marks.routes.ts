import { Router } from "express";
import {
  createMarks,
  getAllMarks,
  getMarksById,
  updateMarks,
  deleteMarks,
} from "./marks.controller";
import {validate} from"../middleware/validation.middleware"; 
import { auth } from "../auth/auth.middleware";
import { authorize } from "../middleware/role.middleware";
import{objectIdSchema,createMarksSchema,updateMarksSchema} from "./marks.validator";

const router: Router = Router();

// Admin & Teacher
router.post(
  "/",
  auth,
  authorize("admin", "teacher"), validate(createMarksSchema),
  createMarks
);

router.patch(
  "/:id",
  auth,
  authorize("admin", "teacher"), validate({objectIdSchema,updateMarksSchema}),
  updateMarks
);

router.delete(
  "/:id",
  auth,
  authorize("admin"),
  deleteMarks
);

// Admin, Teacher & Student
router.get(
  "/",

  getAllMarks
);

router.get(
  "/:id",
  auth,
  authorize("admin", "teacher", "student"), validate(objectIdSchema),
  getMarksById
);

export default router;