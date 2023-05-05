import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists.error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      nome: 'Felippe Mariano',
      telefone: '998123456',
      email: 'felippe@fakemail.com',
      senha: '9494894849',
    })

    const isPasswordCorrectlyHashed = await compare(
      '9494894849',
      user.senha_hash,
    )
    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      nome: 'John Doe',
      senha: '123456',
      email,
      telefone: '1981981',
    })

    expect(() =>
      sut.execute({
        nome: 'John Doe2',
        senha: '123456',
        email,
        telefone: '5619651',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
