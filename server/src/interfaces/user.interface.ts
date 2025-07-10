import { Role } from "../enums/role.enum";

export interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: Role;
    createdAt?: Date;
    updatedAt?: Date;
    comparePassword(candidate: string): Promise<boolean>;
}