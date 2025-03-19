import dotenv from 'dotenv';
dotenv.config(); // Carrega as variáveis

import z from 'zod';

const envSchema = z.object({
  SECRET: z.string(),
  PORT: z.coerce.number().default(3333),
  MONGO_DB_URI: z.string().url(), // Apenas a URI é necessária
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Erro ao validar variáveis de ambiente:", parsedEnv.error.format());
  process.exit(1);
}

export const env = parsedEnv.data;
