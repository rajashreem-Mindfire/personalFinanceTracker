// src/config/index.ts
import * as constants from './constants.config';
import * as env from './env.config';

const config = {
  ...constants,
  ...env,
};

export default config;
