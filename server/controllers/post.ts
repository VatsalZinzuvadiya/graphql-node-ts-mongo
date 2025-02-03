import { 
  createPostService, 
  getAllPostsService, 
  getPostByIdService, 
  updatePostService, 
  deletePostService 
} from "../services/post";

export const getPosts = async () => {
  try {
    const posts = await getAllPostsService();
    return posts;
  } catch (error: any) {
    console.error("Error fetching posts:", error);
    throw new Error(error.message || "Failed to fetch posts. Please try again.");
  }
};

export const getPost = async (_: any, { id }: { id: string }) => {
  try {
    const post = await getPostByIdService(id);
    if (!post) {
      throw new Error("Post not found");
    }
    return post;
  } catch (error: any) {
    console.error("Error fetching post:", error);
    throw new Error(error.message || "Failed to fetch post. Please try again.");
  }
};

export const addPost = async (_: any, { title, content }: any, context: any) => {
  try {
    if (!context.user) {
      throw new Error("Unauthorized: User must be logged in to add a post.");
    }
    if (!title || !content) {
      throw new Error("Title and content are required to create a post.");
    }
    const post = await createPostService(title, content, context.user.userId);
    context.pubsub.publish("POST_UPDATED", { postUpdated: post });
    return post;
  } catch (error: any) {
    console.error("Error creating post:", error);
    throw new Error(error.message || "Failed to create post. Please try again.");
  }
};

export const editPost = async (_: any, { id, title, content }: any, context: any) => {
  try {
    if (!context.user) {
      throw new Error("Unauthorized: User must be logged in to update a post.");
    }
    const updatedPost = await updatePostService(id, title, content, context.user.userId);
    if (!updatedPost) {
      throw new Error("Post not found or unauthorized update.");
    }
    context.pubsub.publish("POST_UPDATED", { postUpdated: updatedPost });
    return updatedPost;
  } catch (error: any) {
    console.error("Error updating post:", error);
    throw new Error(error.message || "Failed to update post. Please try again.");
  }
};

export const removePost = async (_: any, { id }: { id: string }, context: any) => {
  try {
    if (!context.user) {
      throw new Error("Unauthorized: User must be logged in to delete a post.");
    }
    const deletedPost = await deletePostService(id, context.user.userId);
    if (!deletedPost) {
      throw new Error("Post not found or unauthorized deletion.");
    }
    context.pubsub.publish("POST_UPDATED", { postUpdated: null });
    return { message: "Post deleted successfully." };
  } catch (error: any) {
    console.error("Error deleting post:", error);
    throw new Error(error.message || "Failed to delete post. Please try again.");
  }
};
