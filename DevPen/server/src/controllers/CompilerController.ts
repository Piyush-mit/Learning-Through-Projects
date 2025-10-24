import { Request, Response } from "express";
import { Code } from "../models/Code";

export async function handleSave(req: Request, res: Response) {
    try {
        const { fullCode } = req.body;
        const result = await Code.create({ fullCode })
        if(!result) return res.status(404).json({message:"Invalid Input"});
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: "Internal error", error })
    }
}