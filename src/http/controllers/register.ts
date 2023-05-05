import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { RegisterUseCase } from '@/use-cases/register'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists.error'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    nome: z.string(),
    email: z.string().email(),
    telefone: z.string().min(9),
    senha: z.string().min(8),
  })

  const { nome, email, telefone, senha } = registerBodySchema.parse(
    request.body,
  )

  try {
    const usersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    await registerUseCase.execute({
      nome,
      email,
      telefone,
      senha,
    })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send()
    }

    return reply.status(500).send()
  }

  return reply.status(201).send()
}
