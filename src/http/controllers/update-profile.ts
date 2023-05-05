import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UpdateUserProfileUseCase } from '@/use-cases/update-user-profile'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function updateProfile(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateProfileBodySchema = z.object({
    nome: z.string(),
    email: z.string().email(),
    telefone: z.string().min(9),
    senha: z.string().min(8),
  })

  const { nome, email, telefone, senha } = updateProfileBodySchema.parse(
    request.body,
  )

  // try {
  const usersRepository = new PrismaUsersRepository()
  const updateProfileUseCase = new UpdateUserProfileUseCase(usersRepository)

  const user = await updateProfileUseCase.execute({
    nome,
    email,
    telefone,
    senha,
  })

  if (!user) {
    throw new ResourceNotFoundError()
  }

  return {
    user,
  }
  // } catch (error) {
  // if (error instanceof UserAlreadyExistsError) {
  //   return reply.status(409).send()
  // }

  // return reply.status(500).send()
}

// }
