import { Router } from "express";
import {
  createClass, updateClass, getClasses,getClassesById, deleteClass
} from "./class.controller";
import { createClassSchema, objectIdSchema, updateClassSchema } from "./class.validator";
import { validate } from "../middleware/validation.middleware"
import { auth } from "../auth/auth.middleware";
import { authorize } from "../middleware/role.middleware";


const router : Router = Router();


router.post("/", 
  // auth, authorize("admin")
validate({body: createClassSchema }), createClass);


router.get("/",  getClasses
);


router.get("/:id", auth, validate({ objectIdSchema }), getClassesById
);


router.patch("/:id",
  //  auth, authorize("admin"),
   validate({body: updateClassSchema, params: objectIdSchema}), updateClass
);


router.delete("/:id",
  //  auth, 
  validate(objectIdSchema),
  deleteClass
);


export default router;