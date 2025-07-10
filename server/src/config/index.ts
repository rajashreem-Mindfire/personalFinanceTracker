// src/config/index.ts
import * as core from './core.config';
import * as env from './env.config';

const config = {
  ...core,
  ...env,
};

export default config;
