import authenticate from "../middleware/auth.mjs";
import express from "express";
import { getUserProfile } from "../controllers/user";

const profileRouter = express.Router();

profileRouter.get("/", authenticate, getUserProfile);

export default profileRouter;
