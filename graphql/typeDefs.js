const { gql } = require('graphql-tag');

// Define GraphQL schema
const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        email: String!
        token: String
    }
    
    type AuthPayload {
        user: User
        token: String
    }

    type Query {
        users: [User]
        me: User
        products: [Product]
        product(id: ID!): Product
    }

    type Mutation {
        register(name: String!, email: String!, password: String!): AuthPayload
        login(email: String!, password: String!): AuthPayload
        logout: String
    }

    type Product {
        id: ID!
        name: String!
        description: String
        category: String!
        brand: String!
        price: Float!
        imageUrl: String
    }
`;

module.exports = typeDefs;