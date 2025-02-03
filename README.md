Real-Time GraphQL API with Socket.IO
This project is a real-time application built using Express, Apollo Server, and Socket.IO, with GraphQL as the primary API layer. It provides functionalities for authentication, post management, and real-time communication (e.g., private messaging, broadcasting, and room management).

Key Features
GraphQL API
Provides CRUD operations for posts (create, read, update, delete).

Supports real-time updates using GraphQL subscriptions.

Example mutations:

updatePost: Updates the title and content of a post.

deletePost: Deletes a post by its ID.

Real-Time Communication
Socket.IO is integrated for real-time event handling.

Features include:

Private messaging.

Broadcasting messages to all clients.

Room management (joining/leaving rooms).

Real-time updates for posts (e.g., when a post is updated, clients are notified).

Authentication
Uses JWT (JSON Web Tokens) for securing both HTTP (GraphQL) and WebSocket (Socket.IO) endpoints.

Authentication middleware is applied to:

GraphQL endpoints.

Socket.IO connections.

Database Integration
Connects to a database (likely MongoDB or similar) using a connectDB() function.

Stores and retrieves data for posts and user authentication.

Modular Architecture
The code is structured to allow easy adaptation to other frameworks like Nest.js or LoopBack.

Architecture Overview
The project is divided into three main components:

1. Express & Apollo Server
Sets up the HTTP server.

Integrates Apollo Server to handle GraphQL queries and mutations.

Applies authentication middleware to the /graphql endpoint.

2. Socket.IO Integration
Initializes a Socket.IO server on top of the HTTP server.

Uses middleware to authenticate socket connections using JWT tokens.

Handles real-time events such as:

Private messaging.

Broadcasting messages.

Room management.

Listens to GraphQL PubSub events (e.g., POST_UPDATED) and emits updates to clients.

3. GraphQL PubSub Integration
Uses the graphql-subscriptions library to publish and subscribe to real-time events.

Example: When a post is updated, an event is published, and Socket.IO emits the update to connected clients.

Code Walkthrough
1. Server Initialization
Database Connection:

The connectDB() function is called to establish a connection to the database.

GraphQL Setup:

Apollo Server is configured with:

Type definitions (schema).

Resolvers (query, mutation, and subscription logic).

Context (includes the authenticated user and a PubSub instance for real-time updates).

HTTP and Socket Server:

An HTTP server is created from the Express app.

Socket.IO is initialized on this HTTP server and configured to handle real-time events.

2. Socket.IO Initialization
JWT Authentication:

A middleware intercepts the socket connection handshake.

Extracts the JWT token from query parameters, verifies it, and stores the authenticated user in the socket’s data.

Event Listeners:

sendMessage: Sends a private message to the client’s own room.

broadcastMessage: Emits a broadcast message to all connected clients.

Room management: Allows users to join/leave rooms and sends notifications to other room members.

Subscribes to POST_UPDATED events to emit post updates in real time.

3. Client-Side Implementation
Connecting to Socket.IO:

The client connects to the server with a JWT token passed in the query string.

Handling Real-Time Events:

Listeners are set up for:

Private messages.

Broadcast messages.

Post updates.

Sending Messages:

Buttons and input fields allow users to:

Send private messages.

Broadcast messages.

Manage room membership.

Setup & Running Instructions
1. Clone the Repository
bash
Copy
git clone <repository-url>
cd <project-directory>
2. Install Dependencies
Ensure you have Node.js installed, then run:

bash
Copy
npm install
3. Environment Variables
Create a .env file in the root directory with the following variables:

env
Copy
DATABASE_URL=<your-database-connection-string>
JWT_SECRET=<your-jwt-secret-key>
PORT=4000
4. Start the Server
Run the following command to start the server:

bash
Copy
npm start
The server will run on http://localhost:4000.

The GraphQL endpoint will be available at /graphql.

5. Test the Real-Time Features
Open the provided HTML file (or serve it using a static server).

Use your JWT token to authenticate.

Interact with the chat interface and test real-time features.

