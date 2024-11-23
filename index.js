const { ApolloServer } = require('@apollo/server');
const express = require('express');
const { expressMiddleware } = require('@apollo/server/express4');
const { json } = require('body-parser');
const cors = require('cors');
const { gql } = require('graphql-tag');
const path = require('path');

// Define GraphQL schema
const typeDefs = gql`
    type Product {
        id: ID!
        name: String!
        description: String
        price: Float!
        imageUrl: String
    }
    type Query {
        products: [Product]
        product(id: ID!): Product
    }
`;

// List of products as mock data
const productsList = [
    { id: '1', name: 'Airpods', description: 'A great product',
        price: 29.99, imageUrl: '/images/electronics/large/airpods-big.jpg' },
      { id: '2', name: 'Balck Smartwatch', description: 'Another amazing product',
        price: 49.99, imageUrl: '/images/electronics/large/black-smartwatch-big.jpg' },
      { id: '3', name: 'Camer', description: 'Another amazing product',
        price: 49.99, imageUrl: '/images/electronics/large/camera-big.jpg' },
      { id: '4', name: 'Digital Camera', description: 'Another amazing product',
        price: 49.99, imageUrl: '/images/electronics/large/digital-camera-big.jpeg' },
      { id: '5', name: 'Earpod', description: 'Another amazing product',
        price: 49.99, imageUrl: '/images/electronics/large/earpods-big.jpg' },
      { id: '6', name: 'Headset', description: 'Another amazing product',
        price: 49.99, imageUrl: '/images/electronics/large/wired-headset-big.jpg' },
      { id: '7', name: 'Ipad Air', description: 'Another amazing product',
        price: 49.99, imageUrl: '/images/electronics/large/ipad-air-big.webp' },
      { id: '8', name: 'Ipad', description: 'Another amazing product',
        price: 49.99, imageUrl: '/images/electronics/large/ipad-big.png' },
      { id: '9', name: 'Iphone Earbuds', description: 'Another amazing product',
        price: 49.99, imageUrl: '/images/electronics/large/iphone-earbuds-big.jpg' },
      { id: '10', name: 'Macbook', description: 'Another amazing product',
        price: 49.99, imageUrl: '/images/electronics/large/macbook-big.jpeg' },
      { id: '11', name: 'Mouse', description: 'Another amazing product',
        price: 49.99, imageUrl: '/images/electronics/large/mouse-big.jpeg' },
      { id: '12', name: 'Old Laptop', description: 'Another amazing product',
        price: 49.99, imageUrl: '/images/electronics/large/old-laptop-big.webp' },
      { id: '13', name: 'Pendrive', description: 'Another amazing product',
        price: 49.99, imageUrl: '/images/electronics/large/pendrive-big.webp' },
      { id: '14', name: 'Printer', description: 'Another amazing product',
        price: 49.99, imageUrl: '/images/electronics/large/printer-big.webp' },
      { id: '15', name: 'Smartwatch', description: 'Another amazing product',
        price: 49.99, imageUrl: '/images/electronics/large/smartwatch-big.png' },
      { id: '16', name: 'Tablet', description: 'Another amazing product',
        price: 49.99, imageUrl: '/images/electronics/large/tablet-big.jpg' },
      { id: '17', name: 'Wireless Headset', description: 'Another amazing product',
        price: 49.99, imageUrl: '/images/electronics/large/wireless-headset-big.jpg' },
  ];

// Define resolvers to handle the queries 
const resolvers = {
    Query: {
        products: () => productsList,
        product: (parent, args) => productsList.find(product => product.id === args.id)
    }
};

// Initialize Apollo Server v4
const startServer = async () => {
    const app = express();

    // Serve static files from the public folder
    app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

    const server = new ApolloServer({
        typeDefs,
        resolvers
    });
    await server.start();

    app.use(
        '/graphql',
        cors(),
        json(),
        expressMiddleware(server)
    );

    app.listen(4000, () => {
        console.log(`🚀 Server ready at http://localhost:4000/graphql`);
        console.log(`📂 Static files served at http://localhost:4000`);
    });
};

startServer();
