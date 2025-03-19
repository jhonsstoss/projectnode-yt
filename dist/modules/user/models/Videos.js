"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Video = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const uuid_1 = require("uuid");
const videoSchema = new mongoose_1.default.Schema({
    _id: { type: String, default: () => (0, uuid_1.v4)() },
    title: { type: String, required: true },
    description: { type: String, required: true },
    user_id: { type: String, required: true, ref: 'User' }
});
exports.Video = mongoose_1.default.model('Video', videoSchema);
