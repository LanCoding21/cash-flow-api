import { createContainer } from 'instances-container';

// external agency
import prisma from './database/prisma/prisma-client';

// service (repository, helper, manager, etc)
import UserRepository from '../Domains/users/UserRepository';
import AuthRepository from '../Domains/auth/AuthRepository';
import CategoryRepository from '../Domains/categories/CategoryRepository';
import PasswordHash from '../Applications/security/PasswordHash';
import TokenManager from '../Applications/security/TokenManager';
import BcryptPasswordHash from './security/BcryptPasswordHash';
import JwtTokenManager from './security/JwtTokenManager';

// use case
import AddUserUseCase from '../Applications/use_case/user/AddUserUseCase';
import LoginUserUseCase from '../Applications/use_case/user/LoginUserUseCase';
import LogoutUserUseCase from '../Applications/use_case/user/LogoutUserUseCase';
import GetUserByIdUseCase from '../Applications/use_case/user/GetUserByIdUseCase';
import AddCategoryUseCase from '../Applications/use_case/category/AddCategoryUseCase';
import GetAllCategoryUseCase from '../Applications/use_case/category/GetAllCategoryUseCase';
import GetCategoryByIdUseCase from '../Applications/use_case/category/GetCategoryByIdUseCase';
import UpdateCategoryUseCase from '../Applications/use_case/category/UpdateCategoryUseCase';
import DeleteCategoryUseCase from '../Applications/use_case/category/DeleteCategoryUseCase';
import UserRepositoryPrisma from './repository/UserRepositoryPrisma';
import AuthRepositoryPrisma from './repository/AuthRepositoryPrisma';
import CategoryRepositoryPrisma from './repository/CategoryRepositoryPrisma';
import TransactionRepository from '../Domains/transactions/TransactionRepository';
import TransactionRepositoryPrisma from './repository/TransactionRepositoryPrisma';
import AddTransactionUseCase from '../Applications/use_case/transaction/AddTransactionUseCase';
import GetAllTransactionUseCase from '../Applications/use_case/transaction/GetAllTransactionUseCase';
import GetTransactionByIdUseCase from '../Applications/use_case/transaction/GetTransactionByIdUseCase';
import GetSummarizeDailyTransactionUseCase from '../Applications/use_case/transaction/GetSummarizeDailyTransactionUseCase';
import UpdateTransactionUseCase from '../Applications/use_case/transaction/UpdateTransactionUseCase';
import DeleteTransactionUseCase from '../Applications/use_case/transaction/DeleteTransactionUseCase';
import GetTransactionCountUseCase from '../Applications/use_case/transaction/GetTransactionCountUseCase';
import RefreshAccessTokenUseCase from '../Applications/use_case/authentication/RefreshAccessTokenUseCase';
import GetCategoryCountUseCase from '../Applications/use_case/category/GetCategoryCountUseCase';

// creating container
const container = createContainer();

// Service
container.register([
  {
    key: UserRepository.name,
    Class: UserRepositoryPrisma,
    parameter: {
      dependencies: [
        {
          concrete: prisma,
        },
      ],
    },
  },
  {
    key: AuthRepository.name,
    Class: AuthRepositoryPrisma,
    parameter: {
      dependencies: [
        {
          concrete: prisma,
        },
      ],
    },
  },
  {
    key: CategoryRepository.name,
    Class: CategoryRepositoryPrisma,
    parameter: {
      dependencies: [{ concrete: prisma }],
    },
  },
  {
    key: TransactionRepository.name,
    Class: TransactionRepositoryPrisma,
    parameter: {
      dependencies: [{ concrete: prisma }],
    },
  },
  {
    key: PasswordHash.name,
    Class: BcryptPasswordHash,
  },
  {
    key: TokenManager.name,
    Class: JwtTokenManager,
  },
]);

// use case
container.register([
  {
    key: AddUserUseCase.name,
    Class: AddUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
        {
          name: 'passwordHash',
          internal: PasswordHash.name,
        },
      ],
    },
  },
  {
    key: LoginUserUseCase.name,
    Class: LoginUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
        {
          name: 'passwordHash',
          internal: PasswordHash.name,
        },
        {
          name: 'authRepository',
          internal: AuthRepository.name,
        },
        {
          name: 'tokenManager',
          internal: TokenManager.name,
        },
      ],
    },
  },
  {
    key: LogoutUserUseCase.name,
    Class: LogoutUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'authRepository',
          internal: AuthRepository.name,
        },
        {
          name: 'tokenManager',
          internal: TokenManager.name,
        },
      ],
    },
  },
  {
    key: GetUserByIdUseCase.name,
    Class: GetUserByIdUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
      ],
    },
  },
  {
    key: AddCategoryUseCase.name,
    Class: AddCategoryUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'categoryRepository',
          internal: CategoryRepository.name,
        },
      ],
    },
  },
  {
    key: GetAllCategoryUseCase.name,
    Class: GetAllCategoryUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'categoryRepository',
          internal: CategoryRepository.name,
        },
      ],
    },
  },
  {
    key: GetCategoryByIdUseCase.name,
    Class: GetCategoryByIdUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'categoryRepository',
          internal: CategoryRepository.name,
        },
      ],
    },
  },
  {
    key: UpdateCategoryUseCase.name,
    Class: UpdateCategoryUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'categoryRepository',
          internal: CategoryRepository.name,
        },
      ],
    },
  },
  {
    key: DeleteCategoryUseCase.name,
    Class: DeleteCategoryUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'categoryRepository',
          internal: CategoryRepository.name,
        },
      ],
    },
  },
  {
    key: AddTransactionUseCase.name,
    Class: AddTransactionUseCase,
    parameter: {
      dependencies: [{ internal: TransactionRepository.name }],
    },
  },
  {
    key: GetAllTransactionUseCase.name,
    Class: GetAllTransactionUseCase,
    parameter: {
      dependencies: [{ internal: TransactionRepository.name }],
    },
  },
  {
    key: GetTransactionByIdUseCase.name,
    Class: GetTransactionByIdUseCase,
    parameter: {
      dependencies: [{ internal: TransactionRepository.name }],
    },
  },
  {
    key: GetSummarizeDailyTransactionUseCase.name,
    Class: GetSummarizeDailyTransactionUseCase,
    parameter: {
      dependencies: [{ internal: TransactionRepository.name }],
    },
  },
  {
    key: UpdateTransactionUseCase.name,
    Class: UpdateTransactionUseCase,
    parameter: {
      dependencies: [{ internal: TransactionRepository.name }],
    },
  },
  {
    key: DeleteTransactionUseCase.name,
    Class: DeleteTransactionUseCase,
    parameter: {
      dependencies: [{ internal: TransactionRepository.name }],
    },
  },
  {
    key: GetTransactionCountUseCase.name,
    Class: GetTransactionCountUseCase,
    parameter: {
      dependencies: [{ internal: TransactionRepository.name }],
    },
  },
  {
    key: RefreshAccessTokenUseCase.name,
    Class: RefreshAccessTokenUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'tokenManager',
          internal: TokenManager.name,
        },
        {
          name: 'authRepository',
          internal: AuthRepository.name,
        },
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
      ],
    },
  },
  {
    key: GetCategoryCountUseCase.name,
    Class: GetCategoryCountUseCase,
    parameter: {
      dependencies: [{ internal: CategoryRepository.name }],
    },
  },
]);

export default container;
