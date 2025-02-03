import { gql } from "apollo-server-express";

export const postTypeDefs = gql`
  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
  }

  type Query {
    getPosts: [Post]
    getPost(id: ID!): Post
  }

  type Mutation {
    createPost(title: String!, content: String!): Post
    updatePost(id: ID!, title: String!, content: String!): Post
    deletePost(id: ID!): String
  }

  type Subscription {
    postUpdated: Post
  }
`;
