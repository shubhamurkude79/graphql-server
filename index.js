const { gql } = require("apollo-server-express");

// Define GraphQL schema
const typeDefs = gql`
    type Product {
        id: ID!
        name: String!
        description: String
        price: Float!
    }
    type Querry {
        products: [Product]
        product(id: ID!): Product
    }
`;

// Define resolvers to handle the queries

