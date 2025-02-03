import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user";
import model from "../models";

import dotenv from "dotenv";

dotenv.config();

export const registerUser = async (username: string, email: string, password: string): Promise<IUser> => {
  try {
    const existingUser = await model.User.findOne({ email });
    if (existingUser) {
      throw new Error("Email is already in use.");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    return newUser;
  } catch (error) {
    console.error("Error in registerUser:", error);
    throw new Error("Failed to register user. Please try again later.");
  }
};

export const loginUser = async (email: string, password: string): Promise<string> => {
  try {
    const user = await model.User.findOne({ email });
    if (!user) {
      throw new Error("User not found.");
    }
    const valid = await bcrypt.compare(password, user?.password);
    if (!valid) {
      throw new Error("Invalid credentials.");
    }
    const token = generateToken(user?.id)
    return token;
  } catch (error) {
    console.error("Error in loginUser:", error);
    throw new Error("Failed to log in. Please check your credentials and try again.");
  }
};

const generateToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET as string, { expiresIn: "1d" });
};

