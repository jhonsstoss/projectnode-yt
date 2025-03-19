"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const uuid_1 = require("uuid");
// Schema do Mongoose
const userSchema = new mongoose_1.default.Schema({
    _id: { type: String, default: () => (0, uuid_1.v4)() },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
// Model
exports.User = mongoose_1.default.model('User', userSchema);
