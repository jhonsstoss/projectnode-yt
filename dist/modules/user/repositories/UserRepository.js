"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const User_1 = require("../models/User");
const uuid_1 = require("uuid");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
class UserRepository {
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = request.body;
            try {
                const hashedPassword = yield (0, bcryptjs_1.hash)(password, 10);
                const user = new User_1.User({
                    _id: (0, uuid_1.v4)(),
                    name,
                    email,
                    password: hashedPassword
                });
                yield user.save();
                response.status(201).json({ message: 'Usuário criado com sucesso' });
            }
            catch (error) {
                console.error("Erro detalhado:", error); // Adicione esta linha
                response.status(400).json({ error: 'Erro ao criar usuário' });
            }
        });
    }
    login(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = request.body;
            console.log("Login attempt for email:", email);
            try {
                // Busca o usuário e força a tipagem com IUser
                const user = yield User_1.User.findOne({ email }).select('+password');
                if (!user) {
                    return response.status(401).json({ error: 'Credenciais inválidas' });
                }
                // Garante que user.password é string
                const isPasswordValid = yield (0, bcryptjs_1.compare)(password, user.password);
                if (!isPasswordValid) {
                    return response.status(401).json({ error: 'Credenciais inválidas' });
                }
                // Gera o token
                const token = (0, jsonwebtoken_1.sign)({ id: user._id, email: user.email }, process.env.SECRET, { expiresIn: '1d' });
                response.status(200).json({ token, message: 'Autenticado com sucesso' });
            }
            catch (error) {
                response.status(500).json({ error: 'Erro no login' });
            }
        });
    }
    getUser(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const token = ((_a = request.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]) || '';
                const decoded = (0, jsonwebtoken_1.verify)(token, process.env.SECRET);
                const user = yield User_1.User.findById(decoded.id)
                    .select('-password -__v');
                if (!user) {
                    return response.status(404).json({ error: 'Usuário não encontrado' });
                }
                response.status(200).json({
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email
                    }
                });
            }
            catch (error) {
                response.status(401).json({ error: 'Token inválido' });
            }
        });
    }
}
exports.UserRepository = UserRepository;
