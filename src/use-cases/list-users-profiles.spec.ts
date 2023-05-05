import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { ListUsersProfilesUseCase } from './list-users-profiles'

let usersRepository: InMemoryUsersRepository
let sut: ListUsersProfilesUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new ListUsersProfilesUseCase(usersRepository)
  })

  it('should be able to list all users', async () => {
    for (let i = 1; i <= 22; i++) {
      await usersRepository.create({
        nome: 'Fulano ' + i,
        telefone: '9981234' + i,
        email: 'felippe@fakemail.com' + i,
        senha_hash: await hash('123456' + i, 2),
      })
    }

    const { users } = await sut.execute()

    expect(users).toHaveLength(22)
  })
})
