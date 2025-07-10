import mongoose, { Document, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { CallbackError } from 'mongoose';
import { IUser } from '../interfaces/user.interface';
import { Role } from '../enums/role.enum';

const userSchema = new mongoose.Schema<IUser>({
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
        type: String,
        enum: Object.values(Role),
        default: Role.User
    }
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
      return next(error as CallbackError);
    }
  }
});

userSchema.methods.comparePassword = async function (userPassword: string): Promise<boolean> {
    try {
        return await bcrypt.compare(userPassword, this.password);
    } catch (error) {
        throw error;
    }
};
export const UserModel = model<IUser>('User', userSchema);
