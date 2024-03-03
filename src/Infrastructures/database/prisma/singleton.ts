import { PrismaClient } from '@prisma/client';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';

import prisma from './prisma-client';

jest.mock('./prisma-client', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

export default prismaMock;
