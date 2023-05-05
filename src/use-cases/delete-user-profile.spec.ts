import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { hash } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { DeleteUserProfileUseCase } from './delete-user-profile'

let usersRepository: InMemoryUsersRepository
let sut: DeleteUserProfileUseCase

describe('Delete User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new DeleteUserProfileUseCase(usersRepository)
  })

  it('should be able to delete user profile', async () => {
    const createdUser = await usersRepository.create({
      nome: 'John Doe',
      email: 'johndoe@example.com',
      telefone: '6516815',
      senha_hash: await hash('123456', 2),
    })

    await sut.execute({
      userId: createdUser.id,
    })

    expect(() =>
      usersRepository.findById(createdUser.id),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
