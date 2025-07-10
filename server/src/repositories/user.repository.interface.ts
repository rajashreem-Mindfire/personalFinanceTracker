import { IUser } from '../../src/interfaces/user.interface';
import { CreateUserInput, UpdateUserInput } from '../../src/DTOs/user.dto';

export interface IUserRepository {
    create(user: CreateUserInput): Promise<IUser>;
    findByEmail(email: string): Promise<IUser | null>;
    findAll(): Promise<IUser[]>;
    findById(id: string): Promise<IUser | null>;
    update(id: string, user: UpdateUserInput): Promise<IUser | null>;
    delete(id: string): Promise<void>;
}
