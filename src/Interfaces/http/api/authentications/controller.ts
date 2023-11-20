import { NextFunction, Request, Response } from 'express';
import container from '../../../../Infrastructures/container';
import LoginUserUseCase from '../../../../Applications/use_case/user/LoginUserUseCase';
import LogoutUserUseCase from '../../../../Applications/use_case/user/LogoutUserUseCase';
import RefreshAccessTokenUseCase from '../../../../Applications/use_case/authentication/RefreshAccessTokenUseCase';

export async function logIn(req: Request, res: Response, next: NextFunction) {
  try {
    const loginUsecase: LoginUserUseCase = container.getInstance(
      LoginUserUseCase.name,
    );

    const data = await loginUsecase.execute(req.body);

    return res.status(201).json({ message: 'Login success', data });
  } catch (error) {
    return next(error);
  }
}

export async function logOut(req: Request, res: Response, next: NextFunction) {
  try {
    const logoutUsecase: LogoutUserUseCase = container.getInstance(
      LogoutUserUseCase.name,
    );

    await logoutUsecase.execute(req.body);

    return res.status(200).json({ message: 'Logout success' });
  } catch (error) {
    return next(error);
  }
}

export async function refreshToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const useCase: RefreshAccessTokenUseCase = container.getInstance(
      RefreshAccessTokenUseCase.name,
    );

    const accessToken = await useCase.execute(req.body.refreshToken);

    return res.status(201).json({
      message: 'Token refreshed successfully!',
      data: { accessToken },
    });
  } catch (error) {
    return next(error);
  }
}
