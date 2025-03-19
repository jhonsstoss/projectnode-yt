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
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true, // Permite cookies/tokens
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'] // Headers permitidos
}));

app.options('*', cors()); // Habilita preflight para todas as rotas
const PORT = env.PORT || 3333;

// app.use(function(req, res, next){
//   res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // Especifique a origem
//   res.header("Access-Control-Allow-Headers", "Authorization, Content-Type");
//   res.header("Access-Control-Allow-Methods", "POST, GET, PATCH, DELETE, OPTIONS");
//   next();
// });

app.use(express.json());
app.use('/user', userRoutes);
app.use('/videos', videosRoutes);

const URI = env.MONGO_DB_URI
mongoose.connect(URI)
  .then(() => {
    console.log("Connect to the MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Connect error:", err);
  });

  console.log(env.MONGO_DB_URI)