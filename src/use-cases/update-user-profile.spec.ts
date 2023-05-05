import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { UpdateUserProfileUseCase } from './update-user-profile'

let usersRepository: InMemoryUsersRepository
let sut: UpdateUserProfileUseCase

describe('Update User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new UpdateUserProfileUseCase(usersRepository)
  })

  it('should be able to update user profile', async () => {
    const createdUser = await usersRepository.create({
      nome: 'John Doe',
      email: 'johndoe@example.com',
      telefone: '6516815',
      senha_hash: await hash('123456', 2),
    })

    const { user } = await sut.execute({
      nome: 'John Doe Fake',
      email: 'johndoe@example.com',
      telefone: '123123132',
      senha: '123456',
    })

    expect(createdUser.nome).toEqual('John Doe')
    expect(user.nome).toEqual('John Doe Fake')
  })
})
