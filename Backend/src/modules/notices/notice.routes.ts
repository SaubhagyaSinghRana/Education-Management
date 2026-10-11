import { Router } from "express";
import {
  createNotice,
  getAllNotices,
  getNoticeById,
  updateNotice,
  deleteNotice,
} from "./notice.controller";

import { auth } from "../auth/auth.middleware";
import { authorize } from "../middleware/role.middleware";
import { validate } from "../middleware/validation.middleware";

import {
  createNoticeSchema,
  updateNoticeSchema,
  objectIdSchema
} from "./notice.validator";


const router = Router();


// Create Notice (Admin Only)
router.post(
  "/",
  // auth,
  // authorize("admin"),
  validate({
    body: createNoticeSchema
  }),
  createNotice
);


// Get All Notices (All Roles)
router.get(
  "/",
  
  getAllNotices
);


// Get Notice By Id (All Roles)
router.get(
  "/:id",
  // auth,
  // authorize("admin", "teacher", "student"),
  validate({
    params: objectIdSchema
  }),
  getNoticeById
);


// Update Notice (Admin Only)
router.patch(
  "/:id",
  // auth,
  // authorize("admin"),
  validate({
    params: objectIdSchema,
    body: updateNoticeSchema
  }),
  updateNotice
);


// Delete Notice (Admin Only)
router.delete(
  "/:id",
  // auth,
  // authorize("admin"),
  validate({
    params: objectIdSchema
  }),
  deleteNotice
);


export default router;