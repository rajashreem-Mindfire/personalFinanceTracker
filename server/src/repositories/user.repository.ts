import { CreateUserInput, UpdateUserInput } from '../DTOs/user.dto';
import { IUser } from '../interfaces/user.interface';
import { UserModel } from '../models/User';
import { IUserRepository } from './user.repository.interface';

export class UserRepository implements IUserRepository {
    async findByEmail(email: string): Promise<IUser | null> {
        return UserModel.findOne({ email });
    }

    async create(user: CreateUserInput): Promise<IUser> {
        const newUser = new UserModel(user);
        return await newUser.save();
    }

    async findAll(): Promise<IUser[]> {
        return await UserModel.find().sort({ createdAt: -1 });
    }

    async findById(id: string): Promise<IUser | null> {
        return await UserModel.findById(id);
    }
    async update(id: string, user: UpdateUserInput): Promise<IUser | null> {
        return await UserModel.findByIdAndUpdate(id, user, {
            new: true,  // Return the updated document
            runValidators: true, // Validate the update against the schema
        });
    }
    async delete(id: string): Promise<void> {
        await UserModel.findByIdAndDelete(id); 
    }
}
