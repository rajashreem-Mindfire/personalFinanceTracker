// routes/index.ts
import { Router } from 'express';
import authRoutes from './auth.route';
import userRoutes from './user.route';

const router = Router();
router.use('/auth', authRoutes); // auth routes
router.use('/users', userRoutes); // user routes

export default router;
