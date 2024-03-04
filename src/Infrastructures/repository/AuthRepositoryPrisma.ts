import { PrismaClient } from '@prisma/client';
import AuthRepository from '../../Domains/auth/AuthRepository';
import NotFoundError from '../../Commons/exceptions/NotFoundError';
import AuthToken from '../../Domains/auth/entities/AuthToken';

export default class AuthRepositoryPrisma extends AuthRepository {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    super();
    this.prisma = prisma;
  }

  async addToken(token: string): Promise<void> {
    await this.prisma.authentication.create({ data: { token } });
  }

  async checkAvailabilityToken(token: string): Promise<void> {
    const curr = await this.prisma.authentication.findFirst({
      where: {
        token,
      },
    });

    if (!curr) throw new NotFoundError('Refresh token not found');
  }

  async deleteToken(token: string): Promise<void> {
    await this.prisma.authentication.delete({
      where: { id: undefined, token },
    });
  }

  async deleteTokenById(id: number): Promise<void> {
    await this.prisma.authentication.delete({
      where: { id },
    });
  }

  async getToken(token: string): Promise<AuthToken> {
    const curr = await this.prisma.authentication.findFirst({
      where: { token },
    });

    return new AuthToken(curr!);
  }
}
