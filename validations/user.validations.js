import Joi from 'joi';

export const registerUserValidation = Joi.object({
  userName: Joi.string().required().trim().max(10),
  email: Joi.string().required().trim().email(),
  password: Joi.string().required().trim().min(8).max(50),
  role:Joi.string().default("user")
});


export const loginSchema = Joi.object({
  email: Joi.string().required().trim().email(),
  password: Joi.string().required().trim().min(8).max(50),
})