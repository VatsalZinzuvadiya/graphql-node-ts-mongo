import userResolver from './user';
import postResolver from "./post"
// import { authResolvers } from './auth';

export const resolvers = {
  Query: {
    ...userResolver.Query,
    ...postResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...postResolver.Mutation,
  },
};
