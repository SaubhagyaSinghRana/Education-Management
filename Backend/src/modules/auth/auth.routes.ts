import { Router } from "express";

import { login, register, getProfile } from "./auth.controller";
import { createUserSchema, loginSchema } from "./auth.validator";
import { validate } from "../middleware/validation.middleware";
import { authorize } from "../middleware/role.middleware";

import { auth } from "./auth.middleware"

const router: Router = Router();

router.post("/register", validate(createUserSchema), register);
router.post("/login",  validate(loginSchema), login);
router.get("/profile", auth, getProfile)

export default router;