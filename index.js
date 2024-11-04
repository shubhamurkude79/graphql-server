const { ApolloServer } = require('@apollo/server');
const express = require('express');
const { expressMiddleware } = require('@apollo/server/express4');
const { json } = require('body-parser');
const cors = require('cors');
const { gql } = require('graphql-tag');

// Define GraphQL schema
const typeDefs = gql`
    type Product {
        id: ID!
        name: String!
        description: String
        price: Float!
    }
    type Query {
        products: [Product]
        product(id: ID!): Product
    }
`;

// Define resolvers to handle the queries
const resolvers = {
    Query: {
        products: () => [
            { id: '1', name: 'Laptop', description: 'High performance laptop', price: 999.99 },
            { id: '2', name: 'Phone', description: 'Latest smartphone', price: 799.99 },
        ],
        product: (parent, args) => ({
            id: args.id, name: 'Sample Product', description: 'Sample Description', price: 123.45 
        })
    }
};

// Initialize Apollo Server v4
const startServer = async () => {
    const app = express();
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
    });
};

startServer();
