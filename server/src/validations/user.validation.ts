import Joi from "joi";
import { USER_CONSTANTS } from "../constants/user.constants";
export const addUserSchema = Joi.object({
  name: Joi.string()
    .min(USER_CONSTANTS.NAME_MIN_LENGTH)
    .max(USER_CONSTANTS.NAME_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': 'Name is required',
      'string.min': `Name should have at least ${USER_CONSTANTS.NAME_MIN_LENGTH} characters`,
    }),

  email: Joi.string()
    .email()
    .max(USER_CONSTANTS.EMAIL_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Email must be in valid format',
    }),

  password: Joi.string()
    .min(USER_CONSTANTS.PASSWORD_MIN_LENGTH)
    .max(USER_CONSTANTS.PASSWORD_MAX_LENGTH)
    .pattern(new RegExp(USER_CONSTANTS.PASSWORD_REGEX))
    .required()
    .messages({
      'string.empty': 'Password is required',
      'string.min': `Password should be at least ${USER_CONSTANTS.PASSWORD_MIN_LENGTH} characters`,
      'string.pattern.base': 'Password can only contain letters, numbers, and special characters (@#$%^&+=)',
    }),
});

export const updateUserSchema = Joi.object({
  name: Joi.string()
    .min(USER_CONSTANTS.NAME_MIN_LENGTH)
    .max(USER_CONSTANTS.NAME_MAX_LENGTH),
  email: Joi.string()
    .email(),
  password: Joi.string()
    .min(USER_CONSTANTS.PASSWORD_MIN_LENGTH)
    .max(USER_CONSTANTS.PASSWORD_MAX_LENGTH)
    .pattern(new RegExp(USER_CONSTANTS.PASSWORD_REGEX))
  
}).min(1); // require at least one field

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});