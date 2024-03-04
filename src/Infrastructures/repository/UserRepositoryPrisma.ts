import { PrismaClient } from '@prisma/client';
import UserRepository from '../../Domains/users/UserRepository';
import RegisterUser from '../../Domains/users/entities/RegisterUser';
import User from '../../Domains/users/entities/User';
import NotFoundError from '../../Commons/exceptions/NotFoundError';
import InvariantError from '../../Commons/exceptions/InvariantError';

export default class UserRepositoryPrisma extends UserRepository {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    super();
    this.prisma = prisma;
  }

  async addUser(payload: RegisterUser): Promise<void> {
    await this.prisma.user.create({
      data: {
        email: payload.email,
        fullName: payload.fullName,
        password: payload.password,
      },
    });
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findFirst({ where: { email } });
    if (!user) throw new NotFoundError('User not found');

    return new User(user);
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.prisma.user.findFirst({ where: { id } });
    if (!user) throw new NotFoundError('User not found');

    return new User(user);
  }

  async verifyAvailableEmail(email: string): Promise<void> {
    const user = await this.prisma.user.findFirst({ where: { email } });
    if (user) throw new InvariantError('Email has been taken');
  }
}
