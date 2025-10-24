import { Request, Response } from "express";
import { Code } from "../models/Code";

export async function handleSave(req: Request, res: Response) {
    try {
        const { fullCode } = req.body;
        const result = await Code.create({ fullCode })
        if (!result) return res.status(404).json({ message: "Invalid Input" });
        return res.status(200).json({urlId : result._id});
    } catch (error) {
        return res.status(500).json({ message: "Internal error", error })
    }
}

export async function getCode(req: Request, res: Response) {
    try {
        const { urlId } = req.params;
        const result = await Code.findById(urlId);
        if (!result) return res.status(404).json({ message: "Invalid URL" });
        return res.status(200).json(result.fullCode);
    } catch (error) {
        return res.status(500).json({ message: "Internal error", error })
    }
}