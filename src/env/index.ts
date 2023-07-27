// carregar e validar variáveis de ambiente

import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
  PORT: z.coerce.number().default(3333),
});

// validando se o process.env tem as informações
// iguais a configuração envSchema
const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("❌ Invalid environment variables", _env.error.format());

  // em caso de erro o thow vai derrubar a aplicação
  throw new Error("Invalid environment variables")
}

export const env = _env.data