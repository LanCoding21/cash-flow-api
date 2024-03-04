import express, { NextFunction, Request, Response } from 'express';

import cors from 'cors';

import ClientError from '../../Commons/exceptions/ClientError';
import userRouter from '../../Interfaces/http/api/users/routes';
import authRouter from '../../Interfaces/http/api/authentications/routes';
import categoryRouter from '../../Interfaces/http/api/categories/routes';
import transactionRouter from '../../Interfaces/http/api/transactions/routes';

export default function initServer() {
  const app = express();
  const port = process.env.PORT;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(express.static('uploads'));

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running at http://localhost:${port}`);
  });

  app.use('/user', userRouter);

  app.use('/auth', authRouter);

  app.use('/category', categoryRouter);

  app.use('/transaction', transactionRouter);

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err) {
      if (err instanceof ClientError) {
        return res
          .status(err.statusCode)
          .json({ message: err.message, data: null });
      }

      // eslint-disable-next-line no-console
      console.log({ err });
      return res
        .status(500)
        .json({ message: 'Internal server error', data: null });
    }
    return next();
  });
}
