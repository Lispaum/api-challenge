import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = []
  public counter: number = 0

  async update(data: Prisma.UserCreateInput): Promise<User | null> {
    const editingUser = this.users.find((item) => item.email === data.email)

    if (!editingUser) return null

    const newData: User = {
      ...editingUser,
      nome: data.nome,
      email: data.email,
      telefone: data.telefone,
      senha_hash: data.senha_hash,
    }

    this.users = this.users.map((item) => {
      if (item.id === editingUser.id) {
        return newData
      }

      return item
    })

    return newData
  }

  async deleteById(id: number): Promise<User | null> {
    const deletedUser = this.users.find((item) => item.id === id)

    if (!deletedUser) return null

    this.users = this.users.filter((item) => item.id !== id)

    return deletedUser
  }

  async listAll(): Promise<User[]> {
    return this.users
  }

  async create(data: Prisma.UserCreateInput) {
    const user: User = {
      id: this.counter++,
      nome: data.nome,
      email: data.email,
      telefone: data.telefone,
      senha_hash: data.senha_hash,
      dataCriacao: new Date(),
    }

    this.users.push(user)

    return user
  }

  async findById(id: number) {
    const user = this.users.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email)

    if (!user) return null

    return user
  }
}
