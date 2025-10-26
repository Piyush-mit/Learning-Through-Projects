import express from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { loadCode, deleteCode, editCode, getAllCodes, saveOrUpdateCode } from "../controllers/compiler-Controller";

export const compilerRouter = express.Router();

compilerRouter.post("/save", verifyToken, saveOrUpdateCode);
compilerRouter.get("/load/:urlId", verifyToken, loadCode);
compilerRouter.delete("/delete/:id", verifyToken, deleteCode);
compilerRouter.put("/edit/:urlId", verifyToken, editCode);
compilerRouter.get("/get-all-codes", getAllCodes);
