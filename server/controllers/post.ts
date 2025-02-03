import { 
  createPostService, 
  getAllPostsService, 
  getPostByIdService, 
  updatePostService, 
  deletePostService 
} from "../services/post";
import CustomErrors from "../Exceptions/CustomError";

export const getPosts = async () => {
  try {
    const posts = await getAllPostsService();
    if (!posts || posts.length === 0) {
      throw new CustomErrors("No posts available.", 404);
    }
    return posts;
  } catch (error: any) {
    console.error("Error fetching posts:", error);
    throw new CustomErrors(error.message || "Failed to fetch posts. Please try again.", 500);
  }
};

export const getPost = async (_: any, { id }: { id: string }) => {
  try {
    const post = await getPostByIdService(id);
    if (!post) {
      throw new CustomErrors("Post not found", 404);
    }
    return post;
  } catch (error: any) {
    console.error("Error fetching post:", error);
    throw new CustomErrors(error.message || "Failed to fetch post. Please try again.", 500);
  }
};

export const addPost = async (_: any, { title, content }: any, context: any) => {
  try {
    if (!context.user) {
      throw new CustomErrors("Unauthorized: User must be logged in to add a post.", 401);
    }
    if (!title || !content) {
      throw new CustomErrors("Title and content are required to create a post.", 400);
    }
    const post = await createPostService(title, content, context.user.userId);
    context.pubsub.publish("POST_UPDATED", { postUpdated: post });
    return post;
  } catch (error: any) {
    console.error("Error creating post:", error);
    throw new CustomErrors(error.message || "Failed to create post. Please try again.", 500);
  }
};

export const editPost = async (_: any, { id, title, content }: any, context: any) => {
  try {
    if (!context.user) {
      throw new CustomErrors("Unauthorized: User must be logged in to update a post.", 401);
    }
    const updatedPost = await updatePostService(id, title, content, context.user.userId);
    if (!updatedPost) {
      throw new CustomErrors("Post not found or unauthorized update.", 404);
    }
    context.pubsub.publish("POST_UPDATED", { postUpdated: updatedPost });
    return updatedPost;
  } catch (error: any) {
    console.error("Error updating post:", error);
    throw new CustomErrors(error.message || "Failed to update post. Please try again.", 500);
  }
};

export const removePost = async (_: any, { id }: { id: string }, context: any) => {
  try {
    if (!context.user) {
      throw new CustomErrors("Unauthorized: User must be logged in to delete a post.", 401);
    }
    const deletedPost = await deletePostService(id, context.user.userId);
    if (!deletedPost) {
      throw new CustomErrors("Post not found or unauthorized deletion.", 404);
    }
    context.pubsub.publish("POST_UPDATED", { postUpdated: null });
    return { message: "Post deleted successfully." };
  } catch (error: any) {
    console.error("Error deleting post:", error);
    throw new CustomErrors(error.message || "Failed to delete post. Please try again.", 500);
  }
};
