import { PrismaClient } from '@prisma/client'
import { env } from '@/env'

export const prisma = new PrismaClient({
  // mostrar os logis somente em desenvolvimento
  log: env.NODE_ENV === 'dev' ? ['query'] : [],
})
