import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { env } from './env';
import { userRoutes } from './routes/user.routes';
import { videosRoutes } from './routes/videos.routes';
import mongoose from 'mongoose';

console.log(process.env);

config();
const app = express();


app.use(cors({
  origin: '*', // Frontend URL
  credentials: true, // Permite cookies/tokens
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'] // Headers permitidos
}));

app.options('*', cors()); // Habilita preflight para todas as rotas
const PORT = env.PORT || 3333;

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/videos', videosRoutes);

const URI = env.MONGO_DB_URI
mongoose.connect(env.MONGO_DB_URI)
  .then(() => {
    console.log("Connect to the MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Connect error:", err);
  });

  console.log(env.MONGO_DB_URI)