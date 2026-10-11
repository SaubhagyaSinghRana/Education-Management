import { Router } from "express";
import { createExam, getExams, getExamById, updateExam, deleteExam } from "./exam.controller";
import { createExamSchema, updateExamSchema, objectIdSchema } from "./exam.validator";
import { auth } from "../auth/auth.middleware";
import { authorize } from "../middleware/role.middleware";
import { validate } from "../middleware/validation.middleware";

const router: Router = Router();

router.post("/", 
    // auth, authorize("admin"),
     validate({ body: createExamSchema }), createExam);

router.get("/", getExams);

router.get("/:id", auth, authorize("admin", "teacher", "student"), validate({ params: objectIdSchema }), getExamById);

router.patch("/:id", 
    // auth, authorize("admin"),
     validate({ params: objectIdSchema, body: updateExamSchema }), updateExam);

router.delete("/:id",
    //  auth, authorize("admin"),
     validate({ params: objectIdSchema }), deleteExam);

export default router;
