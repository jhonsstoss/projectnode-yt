import { User } from '../models/User';
import { v4 as uuidv4 } from 'uuid';
import { hash, compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { Request, Response } from 'express';

class UserRepository {
  async create(request: Request, response: Response) {
    const { name, email, password } = request.body;
    
    try {
      const hashedPassword = await hash(password, 10);
  
      const user = new User({
        _id: uuidv4(),
        name,
        email,
        password: hashedPassword
      });

      await user.save();
      response.status(201).json({ message: 'Usuário criado com sucesso' });
      
    } catch (error) {
      console.error("Erro detalhado:", error); // Adicione esta linha
      response.status(400).json({ error: 'Erro ao criar usuário' });
    }
  }

  async login(request: Request, response: Response) {
    const { email, password } = request.body;
    console.log("Login attempt for email:", email);
    
    try {
      // Busca o usuário e força a tipagem com IUser
      const user = await User.findOne({ email }).select('+password');
      
      if (!user) {
        return response.status(401).json({ error: 'Credenciais inválidas' });
      }
  
      // Garante que user.password é string
      const isPasswordValid = await compare(password, user.password);
      
      if (!isPasswordValid) {
        return response.status(401).json({ error: 'Credenciais inválidas' });
      }
  
      // Gera o token
      const token = sign(
        { id: user._id, email: user.email },
        process.env.SECRET as string,
        { expiresIn: '1d' }
      );
  
      response.status(200).json({ token, message: 'Autenticado com sucesso' });
      
    } catch (error) {
      response.status(500).json({ error: 'Erro no login' });
    }
  }
  
  async getUser(request: Request, response: Response) {
    try {
      const token = request.headers.authorization?.split(' ')[1] || '';
      const decoded: any = verify(token, process.env.SECRET as string);
      
      const user = await User.findById(decoded.id)
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
      
    } catch (error) {
      response.status(401).json({ error: 'Token inválido' });
    }
  }
}

export { UserRepository };