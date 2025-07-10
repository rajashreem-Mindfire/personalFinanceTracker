// src/config/env.config.ts
import dotenv from 'dotenv-safe';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
  example: path.resolve(__dirname, '../../.env.example'),
});

export const PORT = parseInt(process.env.PORT || '3000', 10);
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const JWT_SECRET = process.env.JWT_SECRET!;
export const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/financetracker';
