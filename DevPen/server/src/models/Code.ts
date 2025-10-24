import mongoose from "mongoose";

export interface ICodeSchema {
    fullCode: {
        html: string
        css: string
        javascript: string
    }
}

const codeSchema = new mongoose.Schema<ICodeSchema>({
    fullCode: {
        html: String,
        css: String,
        javascript: String,
    }
}, { timestamps: true })

export const Code = mongoose.model("Code",codeSchema);
