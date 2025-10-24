"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compilerRouter = void 0;
const express_1 = require("express");
const CompilerController_1 = require("../controllers/CompilerController");
exports.compilerRouter = (0, express_1.Router)();
exports.compilerRouter.post('/save', CompilerController_1.handleSave);
//# sourceMappingURL=compilerRouter.js.map