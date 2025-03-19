"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Carrega as variáveis
const zod_1 = __importDefault(require("zod"));
const envSchema = zod_1.default.object({
    SECRET: zod_1.default.string(),
    PORT: zod_1.default.coerce.number().default(3333),
    MONGO_DB_URI: zod_1.default.string().url(), // Apenas a URI é necessária
});
const parsedEnv = envSchema.safeParse(process.env);
if (!parsedEnv.success) {
    console.error("Erro ao validar variáveis de ambiente:", parsedEnv.error.format());
    process.exit(1);
}
exports.env = parsedEnv.data;
