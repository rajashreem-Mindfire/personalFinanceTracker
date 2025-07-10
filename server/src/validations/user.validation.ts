import Joi from "joi";

export const addUserSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.empty': 'Name is required',
      'string.min': 'Name should have at least 3 characters',
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Email must be in valid format',
    }),

  password: Joi.string()
    .min(6)
    .max(30)
    .pattern(new RegExp('^[a-zA-Z0-9@#$%^&+=]{6,30}$'))
    .required()
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password should be at least 6 characters',
      'string.pattern.base': 'Password can only contain letters, numbers, and special characters (@#$%^&+=)',
    }),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(50),
  email: Joi.string().email(),
  password: Joi.string().min(6)
}).min(1); // require at least one field

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});