import { registerUser as registerUserHelper, loginUser as loginUserHelper } from "../helpers/user";
import { IUser } from "../models/user";

export const registerUserServices = async (username: string, email: string, password: string): Promise<IUser> => {
  try {
    const user = await registerUserHelper(username, email, password);
    return user;
  } catch (error) {
    console.error("Error in registerUserServices:", error);
    throw error;
  }
};

export const loginUserServices = async (email: string, password: string): Promise<string> => {
  try {
    const token = await loginUserHelper(email, password);
    return token;
  } catch (error) {
    console.error("Error in loginUserServices:", error);
    throw error;
  }
};
