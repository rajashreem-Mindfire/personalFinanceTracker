export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface UpdateUserInput {
  name: string;
  email: string;
  role?: string;
}

export interface UserResponse {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt?: Date;
    updatedAt?: Date;
}