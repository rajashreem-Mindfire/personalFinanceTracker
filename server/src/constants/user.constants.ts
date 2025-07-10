// src/constants/user.constants.ts
export const USER_CONSTANTS = {
  ROLES: ['user', 'admin'] as const,
  DEFAULT_ROLE: 'user',
  EMAIL_REGEX: /^\S+@\S+\.\S+$/,
  PASSWORD_REGEX: /^[a-zA-Z0-9@#$%^&+=]{8,30}$/,
  EMAIL_MAX_LENGTH: 30,
  NAME_MIN_LENGTH: 3,
  NAME_MAX_LENGTH: 50,
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 30,
};