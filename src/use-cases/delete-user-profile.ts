import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

interface DeleteUserProfileUseCaseRequest {
  userId: number
}

interface DeleteUserProfileUseCaseResponse {
  user: User
}

export class DeleteUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: DeleteUserProfileUseCaseRequest): Promise<DeleteUserProfileUseCaseResponse> {
    const user = await this.usersRepository.deleteById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}
