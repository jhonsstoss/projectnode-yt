// src/env.ts
import { z } from 'zod';
import { config } from 'dotenv';

// 1. Carregar variáveis primeiro
config();

// 2. Schema de validação otimizado
const envSchema = z.object({
  SECRET: z.string().min(32, "Chave secreta deve ter pelo menos 32 caracteres"),
  PORT: z.coerce.number().int().positive().default(3333),
  MONGO_DB_URI: z.string().url("URI do MongoDB inválida")
    .regex(/mongodb(\+srv)?:\/\//, "Deve ser uma URI MongoDB válida")
});

// 3. Validação estrita
const envResult = envSchema.safeParse(process.env);

// 4. Tratamento de erros detalhado
if (!envResult.success) {
  console.error("❌ Erro nas variáveis de ambiente:");
  envResult.error.errors.forEach((err) => {
    console.error(`- ${err.path.join('.')}: ${err.message}`);
  });
  process.exit(1);
}

// 5. Exporte o ambiente validado
export const env = envResult.data;