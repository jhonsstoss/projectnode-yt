import { Video } from '../../../modules/user/models/Videos';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

class VideoRepository {
  async create(request: Request, response: Response) {
    const { title, description, user_id } = request.body;
    
    try {
      const video = new Video({
        title,
        description,
        user_id
      });

      await video.save();
      response.status(201).json({ message: 'Vídeo criado com sucesso' });
      
    } catch (error) {
      response.status(400).json({ error: 'Erro ao criar vídeo' });
    }
  }

  async getVideos(request: Request, response: Response) {
    const { user_id } = request.query;
    
    try {
      const videos = await Video.find({ user_id: user_id as string });
      response.status(200).json({ videos, message: 'Vídeos retornados com sucesso' });
      
    } catch (error) {
      response.status(400).json({ error: "Erro ao buscar vídeos" });
    }
  }

  async searchVideos(request: Request, response: Response) {
    const { search } = request.query;
    
    try {
      const videos = await Video.find({ 
        title: { $regex: search as string, $options: 'i' } 
      });
      
      response.status(200).json({ videos, message: 'Vídeos encontrados' });
      
    } catch (error) {
      response.status(400).json({ error: "Erro na busca" });
    }
  }
}

export { VideoRepository };