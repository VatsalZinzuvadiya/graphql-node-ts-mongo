import { Server } from "socket.io";
import { PubSub } from "graphql-subscriptions";
import authMiddleware from "./middleware/auth";

export function initSocket(httpServer: any, pubsub: PubSub) {
  console.log("Socket.IO initialized");

  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.use((socket, next) => {
    const token = socket.handshake.query.token;

    if (!token) {
      return next(new Error("Authentication error: Token not provided"));
    }
    const req = {
      headers: { authorization: `Bearer ${token}` },
      path: socket.handshake.url,
    } as any;
    const res = {} as any;

    authMiddleware(req, res, (err: any) => {
      if (err) {
        return next(new Error("Authentication error: Invalid token"));
      }
      socket.data.user = req.user;
      next();
    });
  });

  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id} - User:`, socket.data.user);

    if (socket.data.user && socket.data.user.id) {
      socket.join(socket.data.user.id.toString());
    }

    socket.on("sendMessage", (message: string) => {
      if (socket.data.user && socket.data.user.id) {
        io.to(socket.data.user.id.toString()).emit("receiveMessage", message);
      }
    });

    socket.on("broadcastMessage", (message: string) => {
      io.emit("receiveBroadcast", message);
    });

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });

    pubsub.subscribe("POST_UPDATED", (payload: any) => {
      const data = {
        title: payload?.postUpdated?.title,
        content: payload?.postUpdated?.content,
        author: payload?.postUpdated?.author,
      };
      io.emit("postUpdated", data);
    });
  });
}
