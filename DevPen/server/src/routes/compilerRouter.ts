import { Router } from "express";
import { getCode, handleSave } from "../controllers/CompilerController";

export const compilerRouter = Router()

compilerRouter.post('/save', handleSave);
compilerRouter.get('/load/:urlId', getCode);