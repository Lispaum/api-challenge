import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists.error'

interface RegisterUseCaseRequest {
  nome: string
  email: string
  telefone: string
  senha: string
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ nome, email, telefone, senha }: RegisterUseCaseRequest) {
    const senha_hash = await hash(senha, 2)

    const thereisUserWithSameEmail = await this.usersRepository.findByEmail(
      email,
    )

    if (thereisUserWithSameEmail) throw new UserAlreadyExistsError()

    const user = await this.usersRepository.create({
      nome,
      email,
      telefone,
      senha_hash,
    })

    return {
      user,
    }
  }
}
