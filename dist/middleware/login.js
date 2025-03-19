"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const login = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Extrai o token do header
        console.log("Token recebido:", token);
        console.log("Chave SECRET:", process.env.SECRET);
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }
        // Verifica o token usando a chave secreta do .env
        const decoded = (0, jsonwebtoken_1.verify)(token, process.env.SECRET);
        const isExpired = decoded.exp * 1000 < Date.now();
        if (isExpired) {
            return res.status(401).json({ message: 'Token expirado' });
        }
        // Adiciona os dados do usuário decodificados à requisição
        req.user = decoded;
        next(); // Prossegue para a rota
    }
    catch (error) {
        return res.status(401).json({ message: 'Token inválido ou expirado' });
    }
    console.log('Middleware de login executado.');
};
exports.login = login;
