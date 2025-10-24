"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSave = handleSave;
const Code_1 = require("../models/Code");
async function handleSave(req, res) {
    try {
        const { fullCode } = req.body;
        const result = await Code_1.Code.create({ fullCode });
        if (!result)
            return res.status(404).json({ message: "Invalid Input" });
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(500).json({ message: "Internal error", error });
    }
}
//# sourceMappingURL=CompilerController.js.map