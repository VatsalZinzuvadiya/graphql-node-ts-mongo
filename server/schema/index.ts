import { userTypeDefs } from './user';
import { postTypeDefs } from './post';
import userResolver from '../resolvers/user';
import postResolver from '../resolvers/post';

export const TypeDefs = [userTypeDefs, postTypeDefs];
export const Resolvers = [userResolver, postResolver];
