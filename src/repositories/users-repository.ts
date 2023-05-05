import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>
  update(data: Prisma.UserCreateInput): Promise<User | null>
  findById(id: number): Promise<User | null>
  deleteById(id: number): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  listAll(): Promise<User[]>
}
