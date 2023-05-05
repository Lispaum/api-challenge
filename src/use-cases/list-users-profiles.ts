import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

interface ListUsersProfilesUseCaseResponse {
  users: User[]
}

export class ListUsersProfilesUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(): Promise<ListUsersProfilesUseCaseResponse> {
    const users = await this.usersRepository.listAll()

    if (!users) {
      throw new ResourceNotFoundError()
    }

    return {
      users,
    }
  }
}
