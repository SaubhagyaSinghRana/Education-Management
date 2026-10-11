import { Router } from "express";
import {
  createStudent, getStudents, getStudentById, updateStudent, deleteStudent
} from "./student.controller";
import { createStudentSchema, objectIdSchema, updateStudentSchema } from "./student.validator";
import { validate } from "../middleware/validation.middleware"
import { auth } from "../auth/auth.middleware";
import { authorize } from "../middleware/role.middleware";


const router = Router();


router.post("/", validate(createStudentSchema), createStudent);

router.get("/", getStudents);


router.get("/:id",
  //  auth,
    validate({ objectIdSchema }), getStudentById);


router.patch("/:id",
 validate({ objectIdSchema, updateStudentSchema }),
  updateStudent
);


router.delete("/:id", auth, authorize("admin"), validate({ objectIdSchema }),
  deleteStudent
);


export default router;