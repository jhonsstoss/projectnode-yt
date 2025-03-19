"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosRoutes = void 0;
const express_1 = require("express");
const VideoRepository_1 = require("../modules/videos/models/VideoRepository");
const videosRoutes = (0, express_1.Router)();
exports.videosRoutes = videosRoutes;
const videoRepository = new VideoRepository_1.VideoRepository();
videosRoutes.post('/create-video', (request, response) => {
    videoRepository.create(request, response);
});
videosRoutes.get('/get-video', (request, response) => {
    videoRepository.getVideos(request, response);
});
videosRoutes.get('/search', (request, response) => {
    videoRepository.searchVideos(request, response);
});
