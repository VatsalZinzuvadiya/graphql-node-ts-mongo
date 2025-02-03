import { GraphQLError } from 'graphql';
import { loginUserServices, registerUserServices } from "../services/user";

export const register = async (_: any, { username, email, password }: any) => {
  try {
    if (!username || !email || !password) {
      throw new GraphQLError("All fields (username, email, password) are required.");
    }
    const user = await registerUserServices(username, email, password);
    return user;
  } catch (error: any) {
    console.error("Registration Error:", error);
    throw new GraphQLError(error.message || "Failed to register user. Please try again.");
  }
};

export const login = async (_: any, { email, password }: any) => {
  try {
    if (!email || !password) {
      throw new GraphQLError("Email and password are required.");
    }
    const token = await loginUserServices(email, password);
    return token;
  } catch (error: any) {
    console.error("Login Error:", error);
    throw new GraphQLError(error.message || "Failed to login. Please check your credentials and try again.");
  }
};