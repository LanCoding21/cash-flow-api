import { Router } from 'express';
import validator from '../middleware/validator';
import { addUserSchema } from './validation';
import { addUser, fetchMe } from './controllers';
import auth from '../middleware/auth';

const userRouter = Router();

userRouter.post('/', validator(addUserSchema), addUser);
userRouter.get('/me', auth(), fetchMe);

export default userRouter;
