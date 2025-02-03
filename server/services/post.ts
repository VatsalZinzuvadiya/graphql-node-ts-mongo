import { 
  createPost as createPostHelper, 
  getAllPosts as getAllPostsHelper, 
  getPostById as getPostByIdHelper, 
  updatePost as updatePostHelper, 
  deletePost as deletePostHelper 
} from "../helpers/post";
import { IPost } from "../models/post";

export const createPostService = async (title: string, content: string, author: string): Promise<IPost> => {
  try {
    const post = await createPostHelper(title, content, author);
    return post;
  } catch (error) {
    console.error("Error in createPostService:", error);
    throw error;
  }
};

export const getAllPostsService = async (): Promise<IPost[]> => {
  try {
    const posts = await getAllPostsHelper();
    return posts;
  } catch (error) {
    console.error("Error in getAllPostsService:", error);
    throw error;
  }
};

export const getPostByIdService = async (id: string): Promise<IPost | null> => {
  try {
    const post = await getPostByIdHelper(id);
    return post;
  } catch (error) {
    console.error("Error in getPostByIdService:", error);
    throw error;
  }
};

export const updatePostService = async (id: string, title: string, content: string, author: string): Promise<IPost | null> => {
  try {
    const updatedPost = await updatePostHelper(id, title, content, author);
    return updatedPost;
  } catch (error) {
    console.error("Error in updatePostService:", error);
    throw error;
  }
};

export const deletePostService = async (id: string, author: string): Promise<IPost | null> => {
  try {
    const deletedPost = await deletePostHelper(id, author);
    return deletedPost;
  } catch (error) {
    console.error("Error in deletePostService:", error);
    throw error;
  }
};
