import { Router } from "express";
import { auth } from "../auth/auth.middleware";
import {
  getChatMessages,
  getChatUsers,
} from "./chat.controller";

const router: Router = Router();

router.get("/users", auth, getChatUsers);
router.get("/:userId", auth, getChatMessages);

export default router;