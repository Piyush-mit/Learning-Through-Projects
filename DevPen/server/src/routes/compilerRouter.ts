import express from "express";

import { verifyTokenAnonymous } from "../middlewares/verifyTokenAnonymous";
import { verifyToken } from "../middlewares/verifyToken";
import { saveCode, loadCode, deleteCode, editCode, getAllCodes } from "../controllers/compiler-Controller";

export const compilerRouter = express.Router();

compilerRouter.post("/save", verifyTokenAnonymous, saveCode);
compilerRouter.get("/load/:urlId", verifyTokenAnonymous, loadCode);
compilerRouter.delete("/delete/:id", verifyToken, deleteCode);
compilerRouter.put("/edit/:urlId", verifyToken, editCode);
compilerRouter.get("/get-all-codes", getAllCodes);
