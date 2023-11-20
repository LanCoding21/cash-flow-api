import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import InvariantError from '../../../../Commons/exceptions/InvariantError';

export default function validator(joiSchema: Joi.ObjectSchema) {
  // eslint-disable-next-line func-names
  return function (req: Request, res: Response, next: NextFunction) {
    try {
      const validated = joiSchema.validate(req.body);
      if (validated.error) {
        throw new Error(validated.error.message);
      }
      req.body = validated.value;
      return next();
    } catch (error: any) {
      return next(new InvariantError(error.message));
    }
  };
}
