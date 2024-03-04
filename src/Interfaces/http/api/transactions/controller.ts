import { NextFunction, Response } from 'express';

import { IUserAuthRequest } from '../middleware/auth';
import container from '../../../../Infrastructures/container';
import AddTransactionUseCase from '../../../../Applications/use_case/transaction/AddTransactionUseCase';
import GetUserByIdUseCase from '../../../../Applications/use_case/user/GetUserByIdUseCase';
import GetAllTransactionUseCase from '../../../../Applications/use_case/transaction/GetAllTransactionUseCase';
import GetTransactionByIdUseCase from '../../../../Applications/use_case/transaction/GetTransactionByIdUseCase';
import UpdateTransactionUseCase from '../../../../Applications/use_case/transaction/UpdateTransactionUseCase';
import DeleteTransactionUseCase from '../../../../Applications/use_case/transaction/DeleteTransactionUseCase';
import GetSummarizeDailyTransactionUseCase from '../../../../Applications/use_case/transaction/GetSummarizeDailyTransactionUseCase';
import GetTransactionCountUseCase from '../../../../Applications/use_case/transaction/GetTransactionCountUseCase';

export async function createTransactions(
  req: IUserAuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const useCase: AddTransactionUseCase = container.getInstance(
      AddTransactionUseCase.name,
    );

    const getUserUseCase: GetUserByIdUseCase = container.getInstance(
      GetUserByIdUseCase.name,
    );

    const user = await getUserUseCase.execute(req.user_id!);

    const transactionId = await useCase.execute({
      ...req.body,
      ownerId: req.user_id!,
      createdBy: user.fullName,
      receiptFile: req.file?.filename,
    });

    return res.status(201).json({
      message: 'Transaction created successfully!',
      data: { transactionId },
    });
  } catch (error) {
    return next(error);
  }
}

export async function getUserTransactions(
  req: IUserAuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const useCase: GetAllTransactionUseCase = container.getInstance(
      GetAllTransactionUseCase.name,
    );
    const getCountUseCase: GetTransactionCountUseCase = container.getInstance(
      GetTransactionCountUseCase.name,
    );

    const { date, searchText, categoryId, type, limit, offset } = req.query;

    const payload = {
      ownerId: req.user_id,
      categoryId: categoryId ? +categoryId : undefined,
      date: date as string,
      searchText: searchText as string,
      type: type as string,
      limit: limit ? +limit : undefined,
      offset: offset ? +offset : undefined,
    };

    const transactions = await useCase.execute(payload);

    const totalItems = await getCountUseCase.execute(payload);

    return res.json({
      message: 'Success get transactions',
      data: transactions,
      page: {
        totalItems,
      },
    });
  } catch (error) {
    return next(error);
  }
}

export async function getTransactionById(
  req: IUserAuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const useCase: GetTransactionByIdUseCase = container.getInstance(
      GetTransactionByIdUseCase.name,
    );

    const transaction = await useCase.execute(+req.params.id, req.user_id!);

    return res.json({
      message: 'Success get transaction',
      data: transaction,
    });
  } catch (error) {
    return next(error);
  }
}

export async function updateTransaction(
  req: IUserAuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const useCase: UpdateTransactionUseCase = container.getInstance(
      UpdateTransactionUseCase.name,
    );

    const getUserUseCase: GetUserByIdUseCase = container.getInstance(
      GetUserByIdUseCase.name,
    );

    const user = await getUserUseCase.execute(req.user_id!);

    await useCase.execute(+req.params.id, user.id, {
      ...req.body,
      ownerId: req.user_id!,
      createdBy: user.fullName,
      receiptFile: req.file?.filename,
    });

    return res.status(200).json({
      message: 'Transaction updated successfully!',
    });
  } catch (error) {
    return next(error);
  }
}

export async function deleteTransaction(
  req: IUserAuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const useCase: DeleteTransactionUseCase = container.getInstance(
      DeleteTransactionUseCase.name,
    );

    await useCase.execute(+req.params.id, req.user_id!);

    return res.json({ message: 'Transaction deleted successfully!' });
  } catch (error) {
    return next(error);
  }
}

export async function getSummarizeDailyTransaction(
  req: IUserAuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const useCase: GetSummarizeDailyTransactionUseCase = container.getInstance(
      GetSummarizeDailyTransactionUseCase.name,
    );

    const dateStart = req.query.dateStart?.toString() ?? '';
    const dateEnd = req.query.dateEnd?.toString() ?? '';

    const transactions = await useCase.execute({
      dateStart,
      dateEnd,
      ownerId: req.user_id!,
    });

    return res.json({
      message: 'Success get summarize daily transactions',
      data: { transactions },
    });
  } catch (error) {
    return next(error);
  }
}
