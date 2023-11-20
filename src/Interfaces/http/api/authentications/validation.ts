import Joi from 'joi';

export const logInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8),
});

export const logOutSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

export const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
});
