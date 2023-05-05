import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { ListUsersProfilesUseCase } from '@/use-cases/list-users-profiles'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function listProfiles(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const usersRepository = new PrismaUsersRepository()
  const listUsersProfilesUseCase = new ListUsersProfilesUseCase(usersRepository)

  const { users } = await listUsersProfilesUseCase.execute()

  return reply.status(200).send({
    users,
  })
}
