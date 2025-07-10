// create users controller
import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
    constructor(private readonly userService: UserService) {}

    public async getAllUsers(req: Request, res: Response): Promise<void> {

        // get all users from the database
        const users = await this.userService.getUsers();
        res.status(200).json(users);
    }
    public async getUserById(req: Request, res: Response): Promise<Response> {
        const userId = req.params.id;

        const user = await this.userService.getUserById(userId);
        return res.status(200).json(user);
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
    public createUser = async (req: Request, res: Response): Promise<void> => {
        const user = await this.userService.createUser(req.body);
        res.status(201).json(user);
    }
}
export default UserController;