// create users controller
import { Request, Response } from 'express';
export class UserController {
    constructor() {
    }
    public async getAllUsers(req: Request, res: Response): Promise<Response> {
        // @todo for db call
        return res.status(200).json({
            message: 'Users fetched successfully',
            data: [{ name: 'test', email: 'test@test.com' }], // replace with actual user data
        });
    }
    public async getUserById(req: Request, res: Response): Promise<Response> {
        const userId = req.params.id;

        // @todo for db call
        return res.status(200).json({
            message: 'User added successfully',
            data: { name: 'test', email: 'test@test.com' }
        });
    }
    public async updateUser(req: Request, res: Response): Promise<Response> {
        const userId = req.params.id;
        const { name, email } = req.body;

        // @todo for db call
        return res.status(200).json({
            message: 'User updated successfully',
            data: { id: userId, name, email }
        });
    }
    public async deleteUser(req: Request, res: Response): Promise<Response> {
        const userId = req.params.id;

        // @todo for db call
        return res.status(204).json({
            message: 'User deleted successfully',
            data: null
        });
    }
    public async createUser(req: Request, res: Response): Promise<Response> {
        const { name, email, password } = req.body;

        // @todo for db call
        return res.status(201).json({
            message: 'User added successfully',
            data: { name, email }
        });
    }
}
export default UserController;