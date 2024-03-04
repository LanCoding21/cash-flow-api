"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instances_container_1 = require("instances-container");
// external agency
const prisma_client_1 = __importDefault(require("./database/prisma/prisma-client"));
// service (repository, helper, manager, etc)
const UserRepository_1 = __importDefault(require("../Domains/users/UserRepository"));
const AuthRepository_1 = __importDefault(require("../Domains/auth/AuthRepository"));
const CategoryRepository_1 = __importDefault(require("../Domains/categories/CategoryRepository"));
const PasswordHash_1 = __importDefault(require("../Applications/security/PasswordHash"));
const TokenManager_1 = __importDefault(require("../Applications/security/TokenManager"));
const BcryptPasswordHash_1 = __importDefault(require("./security/BcryptPasswordHash"));
const JwtTokenManager_1 = __importDefault(require("./security/JwtTokenManager"));
// use case
const AddUserUseCase_1 = __importDefault(require("../Applications/use_case/user/AddUserUseCase"));
const LoginUserUseCase_1 = __importDefault(require("../Applications/use_case/user/LoginUserUseCase"));
const LogoutUserUseCase_1 = __importDefault(require("../Applications/use_case/user/LogoutUserUseCase"));
const GetUserByIdUseCase_1 = __importDefault(require("../Applications/use_case/user/GetUserByIdUseCase"));
const AddCategoryUseCase_1 = __importDefault(require("../Applications/use_case/category/AddCategoryUseCase"));
const GetAllCategoryUseCase_1 = __importDefault(require("../Applications/use_case/category/GetAllCategoryUseCase"));
const GetCategoryByIdUseCase_1 = __importDefault(require("../Applications/use_case/category/GetCategoryByIdUseCase"));
const UpdateCategoryUseCase_1 = __importDefault(require("../Applications/use_case/category/UpdateCategoryUseCase"));
const DeleteCategoryUseCase_1 = __importDefault(require("../Applications/use_case/category/DeleteCategoryUseCase"));
const UserRepositoryPrisma_1 = __importDefault(require("./repository/UserRepositoryPrisma"));
const AuthRepositoryPrisma_1 = __importDefault(require("./repository/AuthRepositoryPrisma"));
const CategoryRepositoryPrisma_1 = __importDefault(require("./repository/CategoryRepositoryPrisma"));
const TransactionRepository_1 = __importDefault(require("../Domains/transactions/TransactionRepository"));
const TransactionRepositoryPrisma_1 = __importDefault(require("./repository/TransactionRepositoryPrisma"));
const AddTransactionUseCase_1 = __importDefault(require("../Applications/use_case/transaction/AddTransactionUseCase"));
const GetAllTransactionUseCase_1 = __importDefault(require("../Applications/use_case/transaction/GetAllTransactionUseCase"));
const GetTransactionByIdUseCase_1 = __importDefault(require("../Applications/use_case/transaction/GetTransactionByIdUseCase"));
const GetSummarizeDailyTransactionUseCase_1 = __importDefault(require("../Applications/use_case/transaction/GetSummarizeDailyTransactionUseCase"));
const UpdateTransactionUseCase_1 = __importDefault(require("../Applications/use_case/transaction/UpdateTransactionUseCase"));
const DeleteTransactionUseCase_1 = __importDefault(require("../Applications/use_case/transaction/DeleteTransactionUseCase"));
const GetTransactionCountUseCase_1 = __importDefault(require("../Applications/use_case/transaction/GetTransactionCountUseCase"));
const RefreshAccessTokenUseCase_1 = __importDefault(require("../Applications/use_case/authentication/RefreshAccessTokenUseCase"));
const GetCategoryCountUseCase_1 = __importDefault(require("../Applications/use_case/category/GetCategoryCountUseCase"));
// creating container
const container = (0, instances_container_1.createContainer)();
// Service
container.register([
    {
        key: UserRepository_1.default.name,
        Class: UserRepositoryPrisma_1.default,
        parameter: {
            dependencies: [
                {
                    concrete: prisma_client_1.default,
                },
            ],
        },
    },
    {
        key: AuthRepository_1.default.name,
        Class: AuthRepositoryPrisma_1.default,
        parameter: {
            dependencies: [
                {
                    concrete: prisma_client_1.default,
                },
            ],
        },
    },
    {
        key: CategoryRepository_1.default.name,
        Class: CategoryRepositoryPrisma_1.default,
        parameter: {
            dependencies: [{ concrete: prisma_client_1.default }],
        },
    },
    {
        key: TransactionRepository_1.default.name,
        Class: TransactionRepositoryPrisma_1.default,
        parameter: {
            dependencies: [{ concrete: prisma_client_1.default }],
        },
    },
    {
        key: PasswordHash_1.default.name,
        Class: BcryptPasswordHash_1.default,
    },
    {
        key: TokenManager_1.default.name,
        Class: JwtTokenManager_1.default,
    },
]);
// use case
container.register([
    {
        key: AddUserUseCase_1.default.name,
        Class: AddUserUseCase_1.default,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    name: 'userRepository',
                    internal: UserRepository_1.default.name,
                },
                {
                    name: 'passwordHash',
                    internal: PasswordHash_1.default.name,
                },
            ],
        },
    },
    {
        key: LoginUserUseCase_1.default.name,
        Class: LoginUserUseCase_1.default,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    name: 'userRepository',
                    internal: UserRepository_1.default.name,
                },
                {
                    name: 'passwordHash',
                    internal: PasswordHash_1.default.name,
                },
                {
                    name: 'authRepository',
                    internal: AuthRepository_1.default.name,
                },
                {
                    name: 'tokenManager',
                    internal: TokenManager_1.default.name,
                },
            ],
        },
    },
    {
        key: LogoutUserUseCase_1.default.name,
        Class: LogoutUserUseCase_1.default,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    name: 'authRepository',
                    internal: AuthRepository_1.default.name,
                },
                {
                    name: 'tokenManager',
                    internal: TokenManager_1.default.name,
                },
            ],
        },
    },
    {
        key: GetUserByIdUseCase_1.default.name,
        Class: GetUserByIdUseCase_1.default,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    name: 'userRepository',
                    internal: UserRepository_1.default.name,
                },
            ],
        },
    },
    {
        key: AddCategoryUseCase_1.default.name,
        Class: AddCategoryUseCase_1.default,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    name: 'categoryRepository',
                    internal: CategoryRepository_1.default.name,
                },
            ],
        },
    },
    {
        key: GetAllCategoryUseCase_1.default.name,
        Class: GetAllCategoryUseCase_1.default,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    name: 'categoryRepository',
                    internal: CategoryRepository_1.default.name,
                },
            ],
        },
    },
    {
        key: GetCategoryByIdUseCase_1.default.name,
        Class: GetCategoryByIdUseCase_1.default,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    name: 'categoryRepository',
                    internal: CategoryRepository_1.default.name,
                },
            ],
        },
    },
    {
        key: UpdateCategoryUseCase_1.default.name,
        Class: UpdateCategoryUseCase_1.default,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    name: 'categoryRepository',
                    internal: CategoryRepository_1.default.name,
                },
            ],
        },
    },
    {
        key: DeleteCategoryUseCase_1.default.name,
        Class: DeleteCategoryUseCase_1.default,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    name: 'categoryRepository',
                    internal: CategoryRepository_1.default.name,
                },
            ],
        },
    },
    {
        key: AddTransactionUseCase_1.default.name,
        Class: AddTransactionUseCase_1.default,
        parameter: {
            dependencies: [{ internal: TransactionRepository_1.default.name }],
        },
    },
    {
        key: GetAllTransactionUseCase_1.default.name,
        Class: GetAllTransactionUseCase_1.default,
        parameter: {
            dependencies: [{ internal: TransactionRepository_1.default.name }],
        },
    },
    {
        key: GetTransactionByIdUseCase_1.default.name,
        Class: GetTransactionByIdUseCase_1.default,
        parameter: {
            dependencies: [{ internal: TransactionRepository_1.default.name }],
        },
    },
    {
        key: GetSummarizeDailyTransactionUseCase_1.default.name,
        Class: GetSummarizeDailyTransactionUseCase_1.default,
        parameter: {
            dependencies: [{ internal: TransactionRepository_1.default.name }],
        },
    },
    {
        key: UpdateTransactionUseCase_1.default.name,
        Class: UpdateTransactionUseCase_1.default,
        parameter: {
            dependencies: [{ internal: TransactionRepository_1.default.name }],
        },
    },
    {
        key: DeleteTransactionUseCase_1.default.name,
        Class: DeleteTransactionUseCase_1.default,
        parameter: {
            dependencies: [{ internal: TransactionRepository_1.default.name }],
        },
    },
    {
        key: GetTransactionCountUseCase_1.default.name,
        Class: GetTransactionCountUseCase_1.default,
        parameter: {
            dependencies: [{ internal: TransactionRepository_1.default.name }],
        },
    },
    {
        key: RefreshAccessTokenUseCase_1.default.name,
        Class: RefreshAccessTokenUseCase_1.default,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    name: 'tokenManager',
                    internal: TokenManager_1.default.name,
                },
                {
                    name: 'authRepository',
                    internal: AuthRepository_1.default.name,
                },
                {
                    name: 'userRepository',
                    internal: UserRepository_1.default.name,
                },
            ],
        },
    },
    {
        key: GetCategoryCountUseCase_1.default.name,
        Class: GetCategoryCountUseCase_1.default,
        parameter: {
            dependencies: [{ internal: CategoryRepository_1.default.name }],
        },
    },
]);
exports.default = container;
