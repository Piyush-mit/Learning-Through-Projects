"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const verifyToken_1 = require("../middlewares/verifyToken");
const compiler_Controller_1 = require("../controllers/compiler-Controller");
const user_Controller_1 = require("../controllers/user-Controller");
exports.userRouter = express_1.default.Router();
exports.userRouter.post("/signup", user_Controller_1.signup);
exports.userRouter.post("/login", user_Controller_1.login);
exports.userRouter.post("/logout", user_Controller_1.logout);
exports.userRouter.get("/user-details", verifyToken_1.verifyToken, user_Controller_1.userDetails);
exports.userRouter.get("/my-codes", verifyToken_1.verifyToken, compiler_Controller_1.getMyCodes);
//# sourceMappingURL=userRouter.js.map