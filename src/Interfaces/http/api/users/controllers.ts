import { NextFunction, Request, Response } from 'express';
import AddUserUseCase from '../../../../Applications/use_case/user/AddUserUseCase';
import container from '../../../../Infrastructures/container';
import { IUserAuthRequest } from '../middleware/auth';
import GetUserByIdUseCase from '../../../../Applications/use_case/user/GetUserByIdUseCase';

export async function addUser(req: Request, res: Response, next: NextFunction) {
  try {
    const addUserUseCase: AddUserUseCase = container.getInstance(
      AddUserUseCase.name,
    );

    await addUserUseCase.execute(req.body);

    res.status(201).json({ message: 'Register success' });
  } catch (error) {
    next(error);
  }
}

export async function fetchMe(
  req: IUserAuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const getUserByIdUseCase: GetUserByIdUseCase = container.getInstance(
      GetUserByIdUseCase.name,
    );

    const user = await getUserByIdUseCase.execute(req.user_id!);

    return res
      .status(200)
      .json({ message: 'Success get user', data: { user } });
  } catch (error) {
    return next(error);
  }
}
