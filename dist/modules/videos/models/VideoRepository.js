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
exports.VideoRepository = void 0;
const Videos_1 = require("../../../modules/user/models/Videos");
class VideoRepository {
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description, user_id } = request.body;
            try {
                const video = new Videos_1.Video({
                    title,
                    description,
                    user_id
                });
                yield video.save();
                response.status(201).json({ message: 'Vídeo criado com sucesso' });
            }
            catch (error) {
                response.status(400).json({ error: 'Erro ao criar vídeo' });
            }
        });
    }
    getVideos(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_id } = request.query;
            try {
                const videos = yield Videos_1.Video.find({ user_id: user_id });
                response.status(200).json({ videos, message: 'Vídeos retornados com sucesso' });
            }
            catch (error) {
                response.status(400).json({ error: "Erro ao buscar vídeos" });
            }
        });
    }
    searchVideos(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { search } = request.query;
            try {
                const videos = yield Videos_1.Video.find({
                    title: { $regex: search, $options: 'i' }
                });
                response.status(200).json({ videos, message: 'Vídeos encontrados' });
            }
            catch (error) {
                response.status(400).json({ error: "Erro na busca" });
            }
        });
    }
}
exports.VideoRepository = VideoRepository;
