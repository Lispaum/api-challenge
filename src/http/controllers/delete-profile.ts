import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { DeleteUserProfileUseCase } from '@/use-cases/delete-user-profile'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function deleteProfile(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const usersRepository = new PrismaUsersRepository()
  const deleteUserProfileUseCase = new DeleteUserProfileUseCase(usersRepository)

  console.error(request.user.sub)
  const { user } = await deleteUserProfileUseCase.execute({
    userId: Number(request.user.sub),
  })

  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  })
}
