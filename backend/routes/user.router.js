import express from "express";
import { getUsersForSideBar } from "../controllers/user.controller.js";
import protectRouter from "../middleware/protectRouter.js";

const router = express.Router();

router.get('/', protectRouter, getUsersForSideBar);
export default router