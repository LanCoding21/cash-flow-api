import { PrismaClient } from '@prisma/client';
import TransactionRepository from '../../Domains/transactions/TransactionRepository';
import CreateTransaction from '../../Domains/transactions/entities/CreateTransaction';
import UpdateTransaction from '../../Domains/transactions/entities/UpdateTransaction';
import NotFoundError from '../../Commons/exceptions/NotFoundError';
import AuthorizationError from '../../Commons/exceptions/AuthorizationError';
import Transaction from '../../Domains/transactions/entities/Transaction';
import Category from '../../Domains/categories/entities/Category';
import GetAllTransaction from '../../Domains/transactions/entities/GetAllTransaction';
import SummarizeDailyTransaction from '../../Domains/transactions/entities/SummarizeDailyTransaction';
import { IGetSummarizeDailyTransactionPayload } from '../../Domains/transactions/entities/GetSummarizeDailyTransaction';

export default class TransactionRepositoryPrisma extends TransactionRepository {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    super();
    this.prisma = prisma;
  }

  async getTransactionById(id: number): Promise<Transaction> {
    const curr = await this.prisma.transactions.findFirst({
      where: { id, status: 1 },
      include: {
        category: true,
      },
    });

    const category = new Category({
      id: curr!.category.id,
      name: curr!.category.name,
      ownerId: curr!.category.ownerId,
      type: curr!.category.type,
    });

    return new Transaction({
      ...curr!,
      category,
      receiptFile: curr?.receiptFile,
      createdAt: curr!.createdAt.toISOString(),
      date: curr!.date.toISOString(),
    });
  }

  async getAllTransaction(payload: GetAllTransaction): Promise<Transaction[]> {
    // eslint-disable-next-line operator-linebreak
    const { limit, offset, type, ownerId, date, categoryId, searchText } =
      payload;

    const params: any[] = [{ status: 1 }];

    if (type) {
      params.push({ type });
    }

    if (ownerId) {
      params.push({ ownerId });
    }

    if (date) {
      params.push({
        date: {
          equals: new Date(date),
        },
      });
    }

    if (categoryId) {
      params.push({ categoryId });
    }

    if (searchText) {
      params.push({
        description: {
          contains: searchText,
          mode: 'insensitive',
        },
      });
    }

    const skip = offset && limit ? (offset - 1) * limit : undefined;

    const result = await this.prisma.transactions.findMany({
      take: limit,
      skip,
      include: {
        category: true,
      },
      where: {
        AND: params,
      },
    });

    return result.map((curr) => {
      const category = new Category({
        id: curr!.category.id,
        name: curr!.category.name,
        ownerId: curr!.category.ownerId,
        type: curr!.category.type,
      });

      return new Transaction({
        ...curr!,
        category,
        receiptFile: curr?.receiptFile,
        createdAt: curr!.createdAt.toISOString(),
        date: curr!.date.toISOString(),
      });
    });
  }

  async createTransaction(payload: CreateTransaction): Promise<number> {
    const curr = await this.prisma.transactions.create({
      data: {
        amount: payload.amount,
        createdBy: payload.createdBy,
        date: payload.date,
        description: payload.description,
        type: payload.type,
        categoryId: payload.categoryId,
        ownerId: payload.ownerId,
        receiptFile: payload.receiptFile,
      },
    });

    return curr.id;
  }

  async deleteTransaction(id: number): Promise<void> {
    await this.prisma.transactions.update({
      where: { id },
      data: {
        status: 0,
      },
    });
  }

  async updateTransaction(
    id: number,
    payload: UpdateTransaction,
  ): Promise<void> {
    await this.prisma.transactions.update({
      where: { id },
      data: {
        amount: payload.amount,
        createdBy: payload.createdBy,
        date: payload.date,
        description: payload.description,
        type: payload.type,
        categoryId: payload.categoryId,
        ownerId: payload.ownerId,
        receiptFile: payload.receiptFile,
      },
    });
  }

  async verifyTransactionAvailability(id: number): Promise<void> {
    const curr = await this.prisma.transactions.findFirst({
      where: { id, status: 1 },
    });
    if (!curr) throw new NotFoundError('Transaction not found');
  }

  async verifyTransactionOwner(id: number, userId: number): Promise<void> {
    const curr = await this.prisma.transactions.findFirst({ where: { id } });

    if (curr!.ownerId !== userId) throw new AuthorizationError('Not permitted');
  }

  async summarizeDailyTransaction(
    payload: IGetSummarizeDailyTransactionPayload,
  ): Promise<SummarizeDailyTransaction[]> {
    const dailyGroup = await this.prisma.transactions.groupBy({
      by: ['date', 'type', 'categoryId'],
      _sum: {
        amount: true,
      },
      where: {
        ownerId: payload.ownerId,
        date: {
          gte: new Date(payload.dateStart),
          lte: new Date(payload.dateEnd),
        },
        status: 1,
      },
    });

    const categoryIds = dailyGroup.map((dg) => dg.categoryId);

    const categories = await this.prisma.category.findMany({
      where: {
        id: {
          in: categoryIds,
        },
      },
    });

    return dailyGroup.map(
      (res) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        new SummarizeDailyTransaction({
          // eslint-disable-next-line no-underscore-dangle
          amount: res._sum.amount ?? 0,
          date: res.date.toISOString(),
          type: res.type,
          category: categories.filter((c) => c.id === res.categoryId)[0].name,
        }),
    );
  }

  async getTransactionCount(payload: GetAllTransaction): Promise<number> {
    const { type, ownerId, date, categoryId, searchText } = payload;

    const params: any[] = [{ status: 1 }];

    if (type) {
      params.push({ type });
    }

    if (ownerId) {
      params.push({ ownerId });
    }

    if (date) {
      params.push({ date: new Date(date) });
    }

    if (categoryId) {
      params.push({ categoryId });
    }

    if (searchText) {
      params.push({
        description: {
          contains: searchText,
          mode: 'insensitive',
        },
      });
    }

    const result = await this.prisma.transactions.count({
      where: {
        AND: params,
      },
    });

    return result;
  }
}
