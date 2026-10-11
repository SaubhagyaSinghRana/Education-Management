import { Router } from "express";
import {
  createFees,
  getFees,
  getFeesById,
  payFees,
  getPendingFees,
  deleteFees
} from "./fees.controller";
import { authorize } from "../middleware/role.middleware";
import {validate} from"../middleware/validation.middleware"; 
import {objectIdSchema,updateFeesSchema,createFeesSchema} from"./fees.validator";
import { auth } from "../auth/auth.middleware";


const router: Router = Router();


router.post(
  "/",
  // auth, authorize("admin"),
  validate(createFeesSchema),createFees);


router.get("/",  getFees);
router.get("/:id", 
  // auth,
   validate({params: objectIdSchema}),getFeesById);
   router.get("/pending",
    //  auth,
      getPendingFees);

router.patch("/:id",
  //  auth,authorize("admin"),
   validate({params: objectIdSchema, body: updateFeesSchema}),  payFees);


router.delete(
  "/:id",
  validate({
    params: objectIdSchema,
  }),
  deleteFees
);


export default router;