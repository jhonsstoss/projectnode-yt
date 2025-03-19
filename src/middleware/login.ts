import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { env } from '../env';

export const login = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Extrai o token do header
    console.log("Token recebido:", token);
    console.log("Chave SECRET:", env.SECRET);

    if (!token) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    // Verifica o token usando a chave secreta do .env
    const decoded = verify(token, env.SECRET as string) as { exp: number };
    const isExpired = decoded.exp * 1000 < Date.now();
      if (isExpired) {
        return res.status(401).json({ message: 'Token expirado' });
    }

    
    // Adiciona os dados do usuário decodificados à requisição
    (req as any).user = decoded;
    
    next(); // Prossegue para a rota
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido ou expirado' });
  }

  console.log('Middleware de login executado.');
};