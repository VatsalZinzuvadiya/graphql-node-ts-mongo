// // import express from "express";
// // import { ApolloServer } from "apollo-server-express";
// // import { TypeDefs, Resolvers} from './schema'
// // import connectDB from "./config/db";
// // import authMiddleware from "./middleware/auth";
// // import dotenv from "dotenv";

// // dotenv.config();

// // const app = express() as any;

// // // Apply middleware
// // app.use(authMiddleware);

// // const server = new ApolloServer({
// //   typeDefs: TypeDefs,
// //   resolvers: Resolvers,
// //   context: ({ req }) => ({ user: (req as any).user }),
// // });

// // const PORT = process.env.PORT || 4000;

// // async function startServer() {
// //   await connectDB();
// //   await server.start();
// //   server.applyMiddleware({ app });

// //   app.listen(PORT, () => {
// //     console.log(`Server running on http://localhost:${PORT}${server.graphqlPath}`);
// //   });
// // }

// // startServer();

// import express from "express";
// import { ApolloServer } from "apollo-server-express";
// import { TypeDefs, Resolvers } from './schema';
// import connectDB from "./config/db";
// import authMiddleware from "./middleware/auth";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express() as any;

// // Apply auth middleware to protect the GraphQL endpoint
// app.use('/graphql', authMiddleware);

// // Define the context type
// interface Context {
//   user: any;  // You can replace 'any' with a specific type for 'user'
// }

// // Set up Apollo Server with typeDefs, resolvers, and context
// const server = new ApolloServer({
//   typeDefs: TypeDefs,
//   resolvers: Resolvers,
//   context: ({ req }): Context => ({ user: (req as any).user }),  // Safely cast to any if you can't access a specific type
// });

// const PORT = process.env.PORT || 4000;  // Ensure PORT is defined in your .env

// // Async function to start the server
// async function startServer() {
//   try {
//     await connectDB();  // Connect to your database
//     await server.start();  // Start Apollo Server
//     server.applyMiddleware({ app });  // Apply Apollo middleware to Express app

//     app.listen(PORT, () => {
//       console.log(`Server running on http://localhost:${PORT}${server.graphqlPath}`);
//     });
//   } catch (error) {
//     console.error("Error starting server:", error);
//   }
// }

// startServer();

// import express from "express";
// import { ApolloServer } from "apollo-server-express";
// import { TypeDefs, Resolvers } from "./schema";
// import connectDB from "./config/db";
// import authMiddleware from "./middleware/auth";
// import dotenv from "dotenv";
// import http from "http";
// import { initSocket } from "./socket";

// dotenv.config();

// const app = express() as any;
// app.use("/graphql", authMiddleware);
// interface Context {
//   user: any;
// }
// const server = new ApolloServer({
//   typeDefs: TypeDefs,
//   resolvers: Resolvers,
//   context: ({ req }): Context => ({ user: (req as any).user }),
// });

// const PORT = process.env.PORT || 4000;
// async function startServer() {
//   try {
//     await connectDB();
//     await server.start();
//     server.applyMiddleware({ app });
//     const httpServer = http.createServer(app);
//     initSocket(httpServer);
//     httpServer.listen(PORT, () => {
//       console.log(
//         `Server running on http://localhost:${PORT}${server.graphqlPath}`
//       );
//     });
//   } catch (error) {
//     console.error("Error starting server:", error);
//   }
// }

// startServer();
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

const PORT = process.env.PORT || 4000;

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

