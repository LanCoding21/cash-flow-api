import { NextFunction, Response } from 'express';
import { IUserAuthRequest } from '../middleware/auth';

import container from '../../../../Infrastructures/container';
import AddCategoryUseCase from '../../../../Applications/use_case/category/AddCategoryUseCase';
import UpdateCategoryUseCase from '../../../../Applications/use_case/category/UpdateCategoryUseCase';
import DeleteCategoryUseCase from '../../../../Applications/use_case/category/DeleteCategoryUseCase';
import GetCategoryByIdUseCase from '../../../../Applications/use_case/category/GetCategoryByIdUseCase';
import GetAllCategoryUseCase from '../../../../Applications/use_case/category/GetAllCategoryUseCase';
import GetCategoryCountUseCase from '../../../../Applications/use_case/category/GetCategoryCountUseCase';

export async function createCategory(
  req: IUserAuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const useCase: AddCategoryUseCase = container.getInstance(
      AddCategoryUseCase.name,
    );

    const categoryId = await useCase.execute({
      ...req.body,
      ownerId: req.user_id!,
    });

    return res.status(201).json({
      message: 'Category created successfully!',
      data: { categoryId },
    });
  } catch (error) {
    return next(error);
  }
}

export async function updateCategory(
  req: IUserAuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const useCase: UpdateCategoryUseCase = container.getInstance(
      UpdateCategoryUseCase.name,
    );

    await useCase.execute(+req.params.id, req.body);
    return res.status(200).json({ message: 'Category updated successfully!' });
  } catch (error) {
    return next(error);
  }
}

export async function deleteCategory(
  req: IUserAuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const useCase: DeleteCategoryUseCase = container.getInstance(
      DeleteCategoryUseCase.name,
    );

    await useCase.execute(+req.params.id, req.user_id!);

    return res.json({ message: 'Category deleted successfully!' });
  } catch (error) {
    return next(error);
  }
}

export async function getById(
  req: IUserAuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const useCase: GetCategoryByIdUseCase = container.getInstance(
      GetCategoryByIdUseCase.name,
    );

    const category = await useCase.execute(+req.params.id, req.user_id!);

    return res.json({
      message: 'Success get category data',
      data: category,
    });
  } catch (error) {
    return next(error);
  }
}

export async function getAll(
  req: IUserAuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const useCase: GetAllCategoryUseCase = container.getInstance(
      GetAllCategoryUseCase.name,
    );

    const getCountUseCase: GetCategoryCountUseCase = container.getInstance(
      GetCategoryCountUseCase.name,
    );

    const { limit, offset } = req.params;

    const { type, searchText } = req.query;

    const categories = await useCase.execute({
      ownerId: req.user_id!,
      type: type as string,
      limit: limit ? +limit : undefined,
      offset: offset ? +offset : undefined,
      searchText: searchText as string,
    });

    const totalItems = await getCountUseCase.execute({
      ownerId: req.user_id!,
      type: type as string,
      searchText: searchText as string,
    });

    return res.json({
      message: 'Success get categories data',
      data: categories,
      page: {
        totalItems,
      },
    });
  } catch (error) {
    return next(error);
  }
}
