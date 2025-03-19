"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const env_1 = require("./env");
const user_routes_1 = require("./routes/user.routes");
const videos_routes_1 = require("./routes/videos.routes");
const mongoose_1 = __importDefault(require("mongoose"));
console.log(process.env);
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true, // Permite cookies/tokens
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'] // Headers permitidos
}));
app.options('*', (0, cors_1.default)()); // Habilita preflight para todas as rotas
const PORT = env_1.env.PORT || 3333;
// app.use(function(req, res, next){
//   res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // Especifique a origem
//   res.header("Access-Control-Allow-Headers", "Authorization, Content-Type");
//   res.header("Access-Control-Allow-Methods", "POST, GET, PATCH, DELETE, OPTIONS");
//   next();
// });
app.use(express_1.default.json());
app.use('/user', user_routes_1.userRoutes);
app.use('/videos', videos_routes_1.videosRoutes);
const URI = env_1.env.MONGO_DB_URI;
mongoose_1.default.connect(URI)
    .then(() => {
    console.log("Connect to the MongoDB");
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
    .catch((err) => {
    console.log("Connect error:", err);
});
console.log(env_1.env.MONGO_DB_URI);
