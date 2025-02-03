import { PubSub } from "graphql-subscriptions";
import { getPosts, addPost, getPost, editPost, removePost } from "../controllers/post";

const pubsub = new PubSub();

const postResolver = {
  Query: {
    getPosts,
    getPost,
  },
  Mutation: {
    createPost: addPost,
    updatePost: editPost,
    deletePost: removePost,
  },
};

export default postResolver;
