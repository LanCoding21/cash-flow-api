import { PrismaClient } from '@prisma/client';
import CategoryRepository from '../../Domains/categories/CategoryRepository';
import CreateCategory from '../../Domains/categories/entities/CreateCategory';
import UpdateCategory from '../../Domains/categories/entities/UpdateCategory';
import Category from '../../Domains/categories/entities/Category';
import NotFoundError from '../../Commons/exceptions/NotFoundError';
import AuthorizationError from '../../Commons/exceptions/AuthorizationError';
import GetAllCategory from '../../Domains/categories/entities/GetAllCategory';

export default class CategoryRepositoryPrisma extends CategoryRepository {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    super();
    this.prisma = prisma;
  }

  async getAll(payload: GetAllCategory): Promise<Category[]> {
    const { limit, type, ownerId, searchText, offset: skip } = payload;

    const params: any[] = [{ status: 1 }];
    const orParams: any[] = [];

    if (type) {
      params.push({ type });
    }

    if (ownerId) {
      params.push({ ownerId });
    }

    if (searchText) {
      orParams.push({
        name: {
          contains: searchText.toLowerCase(),
          mode: 'insensitive',
        },
      });
    }

    const result = await this.prisma.category.findMany({
      take: limit,
      skip,
      where: {
        AND: params,
        OR: searchText ? orParams : undefined,
      },
    });

    return result.map((res) => new Category(res));
  }

  async getCategoryById(id: number): Promise<Category> {
    const curr = await this.prisma.category.findFirst({ where: { id } });

    if (!curr) throw new NotFoundError('Category not found');

    return new Category(curr);
  }

  async createCategory(payload: CreateCategory): Promise<number> {
    const curr = await this.prisma.category.create({
      data: {
        name: payload.name,
        type: payload.type,
        ownerId: payload.ownerId,
      },
    });

    return curr.id;
  }

  async updateCategory(id: number, payload: UpdateCategory): Promise<void> {
    await this.prisma.category.update({
      where: { id },
      data: {
        name: payload.name,
        type: payload.type,
      },
    });
  }

  async deleteCategory(id: number): Promise<void> {
    await this.prisma.category.update({
      where: { id },
      data: {
        status: 0,
      },
    });
  }

  async verifyCategoryAvailability(id: number): Promise<void> {
    const curr = await this.prisma.category.findFirst({
      where: { id, status: 1 },
    });
    if (!curr) throw new NotFoundError('Category not found');
  }

  async verifyCategoryOwner(id: number, owner_id: number): Promise<void> {
    const curr = await this.prisma.category.findFirst({ where: { id } });

    if (curr!.ownerId !== owner_id) {
      throw new AuthorizationError('Not permitted');
    }
  }

  async getCategoryCount(payload: GetAllCategory): Promise<number> {
    const { type, ownerId, searchText } = payload;

    const params: any[] = [{ status: 1 }];
    const orParams: any[] = [];

    if (type) {
      params.push({ type });
    }

    if (ownerId) {
      params.push({ ownerId });
    }

    if (searchText) {
      orParams.push({
        name: {
          contains: searchText.toLowerCase(),
          mode: 'insensitive',
        },
      });
    }
    const result = await this.prisma.category.count({
      where: {
        AND: params,
        OR: searchText ? orParams : undefined,
      },
    });

    return result;
  }
}
