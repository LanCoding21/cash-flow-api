import Joi from 'joi';

export const createCategorySchema = Joi.object({
  type: Joi.string().valid('INCOME', 'EXPENSE').required(),
  name: Joi.string().required().min(4),
});

export const updateCategorySchema = Joi.object({
  type: Joi.string().valid('INCOME', 'EXPENSE').required(),
  name: Joi.string().required().min(4),
});
