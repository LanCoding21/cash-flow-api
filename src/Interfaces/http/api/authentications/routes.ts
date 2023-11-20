import { Router } from 'express';
import validator from '../middleware/validator';
import { logInSchema, logOutSchema, refreshTokenSchema } from './validation';
import { logIn, logOut, refreshToken } from './controller';
import auth from '../middleware/auth';

const authRouter = Router();

authRouter.post('/session', validator(logInSchema), logIn);
authRouter.delete('/session', auth(), validator(logOutSchema), logOut);
authRouter.post(
  '/session/refresh',
  validator(refreshTokenSchema),
  refreshToken,
);

export default authRouter;
