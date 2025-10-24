import { Router } from "express";
import { handleSave } from "../controllers/CompilerController";

export const compilerRouter = Router()

compilerRouter.post('/save',handleSave);