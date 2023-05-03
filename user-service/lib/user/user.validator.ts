import Joi from "@hapi/joi";
import { Request, Response, NextFunction } from "express";
import { UserTypes } from "../../shared/types";

const CreateUserSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  userType: Joi.string().valid(UserTypes.CUSTOMER, UserTypes.ADMIN).required(),
});

export const createUserValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await CreateUserSchema.validateAsync(req.body, { allowUnknown: true });
  } catch (err) {
    next(err);
  }

  next();
};
