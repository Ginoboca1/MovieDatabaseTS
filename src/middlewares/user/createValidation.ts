import Joi from "joi";
import { Request, Response, NextFunction } from "express";

export const createValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userValidation = Joi.object({
    userName: Joi.string().min(3).max(20).required(),
    email: Joi.string().regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    ),
    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
      .required(),
    roles: Joi.array().items(Joi.string().valid("admin", "moderator", "user")),
  });

  const validation = userValidation.validate(req.body);

  if (!validation.error) return next();
  return res.status(400).json({
    message: `There was an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};