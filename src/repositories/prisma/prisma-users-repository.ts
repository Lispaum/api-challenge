import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { prisma } from '@/lib/prisma'

export class PrismaUsersRepository implements UsersRepository {
  async update(data: Prisma.UserCreateInput): Promise<User | null> {
    const user = await prisma.user.update({
      where: {
        email: data.email,
      },
      data,
    })

    return user
  }

  async deleteById(id: number): Promise<User | null> {
    const user = await prisma.user.delete({
      where: {
        id,
      },
    })

    return user
  }

  async listAll(): Promise<User[]> {
    return await prisma.user.findMany()
  }

  async findById(id: number): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
