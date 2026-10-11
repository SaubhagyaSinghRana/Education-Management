import { Router } from "express";
import { getStudentEnrollments,getEnrollments, deleteEnrollment, createEnrollment } from "./enrollment.controller";
import { createEnrollmentSchema, objectIdSchema } from "./enrollment.validator";
import { validate } from "../middleware/validation.middleware";
import { auth } from "../auth/auth.middleware";
import { authorize } from "../middleware/role.middleware";


const router: Router = Router();
//admin
router.post("/",
    //  auth, authorize("admin"),
     validate({body:createEnrollmentSchema}), createEnrollment)
router.delete("/:id",
    //  auth,authorize("admin"),
      validate({params:objectIdSchema}), deleteEnrollment)

//student
router.get("/:id", getStudentEnrollments)
router.get("/",  getEnrollments)


export default router;
