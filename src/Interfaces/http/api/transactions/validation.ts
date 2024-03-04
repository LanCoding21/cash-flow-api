import Joi from 'joi';

export const transactionCreateSchema = Joi.object({
  amount: Joi.number().min(1).required(),
  date: Joi.string().isoDate().required(),
  description: Joi.string().required(),
  categoryId: Joi.number().required(),
  type: Joi.string().required().allow('INCOME', 'EXPENSE'),
});

export const transactionUpdateSchema = Joi.object({
  amount: Joi.number().min(1).required(),
  date: Joi.string().isoDate().required(),
  description: Joi.string().required(),
  categoryId: Joi.number().required(),
  type: Joi.string().required().allow('INCOME', 'EXPENSE'),
});
