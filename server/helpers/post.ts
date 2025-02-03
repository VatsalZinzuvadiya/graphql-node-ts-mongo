import mongoose, { Types } from "mongoose";
import Post, { IPost } from "../models/post";
import client from "../config/redis";

export const createPost = async (
  title: string,
  content: string,
  author: string
): Promise<IPost> => {
  try {
    const newPost = new Post({ title, content, author });
    await newPost.save();
    return newPost;
  } catch (error) {
    console.error("Error creating post:", error);
    throw new Error("Failed to create post");
  }
};

export const getAllPosts = async (): Promise<IPost[]> => {
  try {
    const posts = await Post.find().populate("author");
    const sanitizedPosts: IPost[] = posts.map((post) => sanitizePost(post));
    return sanitizedPosts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts");
  }
};

export const getPostById = async (id: string): Promise<IPost | null> => {
  try {
    const post = await Post.findById(id).populate("author");
    if (post) {
      return sanitizePost(post);
    }
    return null;
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    throw new Error("Failed to fetch post");
  }
};

export const updatePost = async (
  id: string,
  title: string,
  content: string,
  author: string
): Promise<IPost | null> => {
  try {
    return await Post.findOneAndUpdate(
      { _id: id, author: new mongoose.Types.ObjectId(author) },
      { title, content },
      { new: true }
    );
  } catch (error) {
    console.error("Error updating post:", error);
    throw new Error("Failed to update post");
  }
};

export const deletePost = async (
  id: string,
  author: string
): Promise<IPost | null> => {
  try {
    return await Post.findOneAndDelete({
      _id: id,
      author: new mongoose.Types.ObjectId(author),
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    throw new Error("Failed to delete post");
  }
};

export const getFromCache = async (key: string): Promise<string | null> => {
  try {
    const data = await client.get(key);
    return data;
  } catch (error) {
    console.error("Error fetching from cache:", error);
    return null;
  }
};

export const setToCache = async (
  key: string,
  data: string,
  ttl: number = 60
): Promise<void> => {
  // TTL for 60 sec
  try {
    await client.setEx(key, ttl, data);
  } catch (error) {
    console.error("Error setting data to cache:", error);
  }
};

const sanitizePost = (post: any): IPost => {
  const sanitizedPost: any = {
    id: (post?._id as Types.ObjectId).toString(),
    title: post?.title,
    content: post?.content,
    author: post?.author,
  };
  return sanitizedPost;
};
