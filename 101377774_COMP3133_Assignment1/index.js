require('dotenv').config(); // Ensure this is at the top to load environment variables
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');


// Use environment variables for security
const mongoUri = process.env.MONGODB_URI;

// Connect to MongoDB Atlas using Mongoose
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas...'))
.catch(err => console.error('Could not connect to MongoDB Atlas...', err));

// Import type definitions and resolvers
const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./resolvers/resolvers');

// Create the Apollo Server instance with imported typeDefs and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // If you're using context for authentication or other purposes, set it up here
  // context: ({ req }) => ({ ... })
});

// Initialize the app as an Express application
const app = express();

// Start Apollo Server
async function startServer() {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' }); // Make sure this path matches your frontend's GraphQL requests

  // Use the PORT environment variable, or 4000 as a fallback
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}${server.graphqlPath}`);
  });
}

// Call the function to start the server
startServer();
