import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import InvariantError from '../../../../Commons/exceptions/InvariantError';
import {
  createTransactions,
  deleteTransaction,
  getSummarizeDailyTransaction,
  getTransactionById,
  getUserTransactions,
  updateTransaction,
} from './controller';
import validator from '../middleware/validator';
import { transactionCreateSchema, transactionUpdateSchema } from './validation';
import auth from '../middleware/auth';

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join('./uploads'));
  },
  filename: (req, file, callback) => {
    callback(null, `${uuidv4()}${path.extname(file.originalname)}`);
  },
});

const transactionRouter = Router();

transactionRouter.post(
  '/',
  auth(),
  multer({
    storage: diskStorage,
    limits: {
      fieldSize: 1 * 1024 * 1024,
    },
    fileFilter: (req, file, callback) => {
      const ext = path.extname(file.originalname);
      if (!['.png', '.jpg', '.gif', '.jpeg', '.pdf'].includes(ext)) {
        return callback(new InvariantError('File type is not allowed'));
      }
      return callback(null, true);
    },
  }).single('receipt'),
  validator(transactionCreateSchema),
  createTransactions,
);

transactionRouter.get('/summarize/daily', auth(), getSummarizeDailyTransaction);

transactionRouter.get('/', auth(), getUserTransactions);

transactionRouter.get('/:id', auth(), getTransactionById);

transactionRouter.delete('/:id', auth(), deleteTransaction);

transactionRouter.put(
  '/:id',
  auth(),
  multer({
    storage: diskStorage,
    limits: {
      fieldSize: 1 * 1024 * 1024,
    },
    fileFilter: (req, file, callback) => {
      const ext = path.extname(file.originalname);
      if (!['.png', '.jpg', '.gif', '.jpeg'].includes(ext)) {
        return callback(new InvariantError('Only images are allowed'));
      }
      return callback(null, true);
    },
  }).single('receipt'),
  validator(transactionUpdateSchema),
  updateTransaction,
);

export default transactionRouter;
