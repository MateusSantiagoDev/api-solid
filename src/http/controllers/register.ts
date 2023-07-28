import { FastifyRequest, FastifyReply } from 'fastify'
import { hash } from 'bcryptjs'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  // validação no email e no minimo 6 caracteres na senha
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  // validação usando o parse
  const { name, email, password } = registerBodySchema.parse(request.body)

  // criptografando a senha
  const password_hash = await hash(password, 6)

  // validando email único
  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })
  if (userWithSameEmail) {
    return reply.status(409).send()
  }

  // criação dos dados
  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  })

  return reply.status(201).send()
}
