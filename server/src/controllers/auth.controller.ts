// src/controllers/auth.controller.ts
import { Request, Response } from 'express';

export class AuthController {
    constructor() {

    }
    public async login(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;

        // 🔐 Replace with real logic (DB check, password hash, JWT, etc.)
        if (email === 'admin@example.com' && password === 'admin123') {
        return res.status(200).json({ token: 'mock-jwt-token' });
        }

        return res.status(401).json({ message: 'Invalid credentials' });
    }

    public async logout(req: Request, res: Response): Promise<Response> {
        // For JWT stateless logout, just let frontend delete the token
        return res.status(200).json({ message: 'Logged out' });
    }
}
export default AuthController;