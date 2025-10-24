"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbconnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const dbconnect = () => {
    mongoose_1.default.connect(process.env.MONGO_URL)
        .then(() => console.log("Connected to Mongo Database"))
        .catch(() => console.log("Error connecting to database"));
};
exports.dbconnect = dbconnect;
//# sourceMappingURL=dbConnect.js.map