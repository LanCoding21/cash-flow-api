import { Router } from 'express';
import {
  createCategory,
  deleteCategory,
  getAll,
  getById,
  updateCategory,
} from './controller';
import auth from '../middleware/auth';
import validator from '../middleware/validator';
import { createCategorySchema, updateCategorySchema } from './validation';

const categoryRouter = Router();

categoryRouter.get('/', auth(), getAll);
categoryRouter.post(
  '/',
  auth(),
  validator(createCategorySchema),
  createCategory,
);
categoryRouter.get('/:id', auth(), getById);
categoryRouter.put(
  '/:id',
  auth(),
  validator(updateCategorySchema),
  updateCategory,
);
categoryRouter.delete('/:id', auth(), deleteCategory);

export default categoryRouter;
