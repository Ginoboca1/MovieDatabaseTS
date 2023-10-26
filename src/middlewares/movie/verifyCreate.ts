import Joi from "joi";
import { Request, Response, NextFunction } from "express";

export const createValidation = (req: Request, res: Response, next:NextFunction) => {
  const movieValidation = Joi.object({
    title: Joi.string().min(3).max(20).required(),
    director: Joi.string().min(5).max(20).required(),
    genre: Joi.string().min(3).max(20).required(),
    year: Joi.number().required(),
    rating: Joi.number().required(),
    imgURL: Joi.string().regex(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/),
  });

  const validation = movieValidation.validate(req.body);

  if (!validation.error) return next();
  return res.status(400).json({
    message: `There was an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};