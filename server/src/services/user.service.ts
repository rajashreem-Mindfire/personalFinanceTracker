// services/user.service.ts
import { UserModel } from '../models/User';
import { IUser } from '../../src/interfaces/user.interface';
import { CreateUserInput, UpdateUserInput, UserResponse } from '../DTOs/user.dto';
import { IUserRepository } from '../repositories/user.repository.interface';

export class UserService {
    constructor(private readonly userRepository: IUserRepository) {}
    async createUser(dto: CreateUserInput): Promise<UserResponse> {
        const exists = await this.userRepository.findByEmail(dto.email);
        if (exists) throw new Error('User already exists');

        // Create user
        const user = await this.userRepository.create(dto); // pre('save') do the hashing

        if (!user) throw new Error('User creation failed');
        return this.formatUserResponse(user);
    };

    async getUsers(): Promise<UserResponse[]> {

        // get user
        const users = await this.userRepository.findAll(); // pre('save') do the hashing
        return users.map(user => this.formatUserResponse(user));
    };

    async getUserById(id: string): Promise<UserResponse> {

        // get user
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new Error("User is not present");
        }
        return this.formatUserResponse(user);
    };

    async updateUser(id: string, dto: UpdateUserInput): Promise<UserResponse> {

        // update user
        const user = await this.userRepository.update(id, dto);
        if (!user) {
            throw new Error("User is not present");
        }
        return this.formatUserResponse(user);
    };

    async deleteUser(id: string): Promise<void> {

        // delete user
        await this.userRepository.delete(id);
    };

    private formatUserResponse(user: IUser): UserResponse {
        const userResponse: UserResponse = {
                                                id: user._id.toString(),
                                                name: user.name,
                                                email: user.email,
                                                role: user.role,
                                                createdAt: user.createdAt
                                                };
        return userResponse;
    }
}
