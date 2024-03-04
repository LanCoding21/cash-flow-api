import Joi from 'joi';

// eslint-disable-next-line import/prefer-default-export
export const addUserSchema = Joi.object({
  email: Joi.string().required(),
  fullName: Joi.string().required(),
  password: Joi.string().required().min(8),
});
