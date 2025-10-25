"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compilerRouter = void 0;
const express_1 = __importDefault(require("express"));
const verifyTokenAnonymous_1 = require("../middlewares/verifyTokenAnonymous");
const verifyToken_1 = require("../middlewares/verifyToken");
const compiler_Controller_1 = require("../controllers/compiler-Controller");
exports.compilerRouter = express_1.default.Router();
exports.compilerRouter.post("/save", verifyTokenAnonymous_1.verifyTokenAnonymous, compiler_Controller_1.saveCode);
exports.compilerRouter.get("/load/:urlId", verifyTokenAnonymous_1.verifyTokenAnonymous, compiler_Controller_1.loadCode);
exports.compilerRouter.delete("/delete/:id", verifyToken_1.verifyToken, compiler_Controller_1.deleteCode);
exports.compilerRouter.put("/edit/:urlId", verifyToken_1.verifyToken, compiler_Controller_1.editCode);
exports.compilerRouter.get("/get-all-codes", compiler_Controller_1.getAllCodes);
//# sourceMappingURL=compilerRouter.js.map