import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export async function registerUseCase({
  name,
  email,
  password,
}: RegisterUseCaseRequest) {
    
  // criptografando a senha
  const password_hash = await hash(password, 6)

  // validando email único
  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })
  if (userWithSameEmail) {
    throw new Error('E-mail already exists.')
  }

  // criação dos dados
  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  })
}
