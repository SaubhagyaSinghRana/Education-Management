import { Router } from "express";
import { chatWithAI } from "./ai";

const router : Router = Router();

router.post("/chat", chatWithAI);
router.get("/chat", chatWithAI);


export default router;