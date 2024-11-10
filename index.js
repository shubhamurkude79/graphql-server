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
        price: 29.99, imageUrl: '/static/images/electronics/small/airpods.jpeg' },
      { id: '2', name: 'Balck Smartwatch', description: 'Another amazing product',
        price: 49.99, imageUrl: '/static/images/electronics/small/balck-smartwatch.jpeg' },
      { id: '3', name: 'Camer', description: 'Another amazing product',
        price: 49.99, imageUrl: '/static/images/electronics/small/camera.jpeg' },
      { id: '4', name: 'Digital Camera', description: 'Another amazing product',
        price: 49.99, imageUrl: '/static/images/electronics/small/digital-camera.jpeg' },
      { id: '5', name: 'Earpod', description: 'Another amazing product',
        price: 49.99, imageUrl: '/static/images/electronics/small/earpods.jpeg' },
      { id: '6', name: 'Headset', description: 'Another amazing product',
        price: 49.99, imageUrl: '/static/images/electronics/small/headset.jpeg' },
      { id: '7', name: 'Ipad Air', description: 'Another amazing product',
        price: 49.99, imageUrl: '/static/images/electronics/small/ipad-air.jpeg' },
      { id: '8', name: 'Ipad', description: 'Another amazing product',
        price: 49.99, imageUrl: '/static/images/electronics/small/ipad.jpeg' },
      { id: '9', name: 'Iphone Earbuds', description: 'Another amazing product',
        price: 49.99, imageUrl: '/static/images/electronics/small/iphone-earbuds.jpeg' },
      { id: '10', name: 'Macbook', description: 'Another amazing product',
        price: 49.99, imageUrl: '/static/images/electronics/small/macbook.jpeg' },
      { id: '11', name: 'Mouse', description: 'Another amazing product',
        price: 49.99, imageUrl: '/static/images/electronics/small/mouse.jpeg' },
      { id: '12', name: 'Old Laptop', description: 'Another amazing product',
        price: 49.99, imageUrl: '/static/images/electronics/small/old-laptop.jpeg' },
      { id: '13', name: 'Pendrive', description: 'Another amazing product',
        price: 49.99, imageUrl: '/static/images/electronics/small/pendrive.jpeg' },
      { id: '14', name: 'Printer', description: 'Another amazing product',
        price: 49.99, imageUrl: '/static/images/electronics/small/printer.jpeg' },
      { id: '15', name: 'Smartwatch', description: 'Another amazing product',
        price: 49.99, imageUrl: '/static/images/electronics/small/smartwatch.jpeg' },
      { id: '16', name: 'Tablet', description: 'Another amazing product',
        price: 49.99, imageUrl: '/static/images/electronics/small/tablet.jpeg' },
      { id: '17', name: 'Wireless Headset', description: 'Another amazing product',
        price: 49.99, imageUrl: '/static/images/electronics/small/wireless-headset.jpeg' },
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
    app.use('/static', express.static(path.join(__dirname, 'public')));

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
        console.log(`📂 Static files served at http://localhost:4000/static`);
    });
};

startServer();
