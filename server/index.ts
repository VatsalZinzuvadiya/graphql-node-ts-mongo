import express from "express";
import { ApolloServer } from "apollo-server-express";
import { PubSub } from "graphql-subscriptions";
import { TypeDefs, Resolvers } from "./schema";
import connectDB from "./config/db";
import authMiddleware from "./middleware/auth";
import dotenv from "dotenv";
import http from "http";
import { initSocket } from "./socket";
import CustomErrors from "./Exceptions/CustomError";
const config = require('../config');

dotenv.config();

const app = express() as any;
const pubsub = new PubSub();
app.use("/graphql", authMiddleware);

interface Context {
  user: any;
  pubsub: PubSub;
}

const server = new ApolloServer({
  typeDefs: TypeDefs,
  resolvers: Resolvers,
  context: ({ req }): Context => ({ user: (req as any).user, pubsub }),
  formatError: (err) => {
    const customError = err.originalError as CustomErrors | undefined;
    if (customError) {
      return {
        message: err.message,
        code: customError.statusCode,
      };
    }
    return err;
  },

});

const PORT = config.server.port ;

async function startServer() {
  try {
    await connectDB();
    await server.start();
    server.applyMiddleware({ app });
    const httpServer = http.createServer(app);
    initSocket(httpServer, pubsub);
    httpServer.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}${server.graphqlPath}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

startServer();

