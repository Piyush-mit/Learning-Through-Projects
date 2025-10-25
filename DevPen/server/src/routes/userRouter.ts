import express from "express";

import { verifyToken } from "../middlewares/verifyToken";
import { getMyCodes } from "../controllers/compiler-Controller";
import { signup, login, logout, userDetails } from "../controllers/user-Controller";
export const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.get("/user-details", verifyToken, userDetails);
userRouter.get("/my-codes", verifyToken, getMyCodes);
