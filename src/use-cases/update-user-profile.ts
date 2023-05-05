import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { hash } from 'bcryptjs'

interface UpdateUserProfileUseCaseRequest {
  nome: string
  email: string
  telefone: string
  senha: string
}

interface UpdateUserProfileUseCaseResponse {
  user: User
}

export class UpdateUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    nome,
    email,
    telefone,
    senha,
  }: UpdateUserProfileUseCaseRequest): Promise<UpdateUserProfileUseCaseResponse> {
    const senha_hash = await hash(senha, 2)

    const user = await this.usersRepository.update({
      nome,
      email,
      telefone,
      senha_hash,
    })

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}
