require('dotenv').config();
const connectDB = require('./config/db');
const { ApolloServer } = require('@apollo/server');
const express = require('express');
const { expressMiddleware } = require('@apollo/server/express4');
const { json } = require('body-parser');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

// Initialize Apollo Server v4
const startServer = async () => {
  await connectDB(); // Connect to MongoDB

    const app = express();
    app.use(cors());
    app.use(json());

    // Serve static files from the public folder
    app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

    // Middleware for authentication
    app.use((req, res, next) => {
      const token = req.headers.authorization?.split(' ')[1];
      if (token) {
          try {
              req.user = jwt.verify(token, process.env.JWT_SECRET);
          } catch (error) {
              console.log('Invalid token');
          }
      }
      next();
  });

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => ({ user: req.user })
    });
    await server.start();

    app.use(
        '/graphql', expressMiddleware(server)
    );

    app.listen(4000, () => {
        console.log(`🚀 Server ready at http://localhost:4000/graphql`);
        console.log(`📂 Static files served at http://localhost:4000`);
    });
};

startServer();
