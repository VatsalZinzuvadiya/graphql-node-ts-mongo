import model from "../models";
import { register, login } from "../controllers/user";

const userResolver = {
  Query: {
    getUsers: async () => await model.User.find(),
  },
  Mutation: {
    register,
    login,
  },
};

export default userResolver;
