import { Router } from "express";
import { getSubjects, updateSubject, deleteSubject, createSubject } from "./subject.controller";
import { createSubjectSchema, updateSubjectSchema, objectIdSchema } from "./subject.validator";
import { validate } from "../middleware/validation.middleware";
import { auth } from "../auth/auth.middleware";
import { authorize } from "../middleware/role.middleware";


const router: Router = Router();


router.post("/",
    //  auth,authorize("admin")
      validate(createSubjectSchema), createSubject);
router.get("/", getSubjects)
router.patch("/:id",
    //  auth,
      validate({ params: objectIdSchema, body: updateSubjectSchema }), updateSubject)
router.delete("/:id",
    //  auth,
      validate({ params: objectIdSchema }   ), deleteSubject)


export default router;