import mongoose from "mongoose";
import Post, { IPost } from "../models/post";

export const createPost = async (title: string, content: string, author: string): Promise<IPost> => {
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
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts");
  }
};

export const getPostById = async (id: string): Promise<IPost | null> => {
  try {
    return await Post.findById(id).populate("author");
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    throw new Error("Failed to fetch post");
  }
};

export const updatePost = async (id: string, title: string, content: string, author: string): Promise<IPost | null> => {
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

export const deletePost = async (id: string, author: string): Promise<IPost | null> => {
  try {
    return await Post.findOneAndDelete({ _id: id, author: new mongoose.Types.ObjectId(author) });
  } catch (error) {
    console.error("Error deleting post:", error);
    throw new Error("Failed to delete post");
  }
};
