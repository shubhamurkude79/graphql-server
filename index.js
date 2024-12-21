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
        category: String!
        brand: String!
        price: Float!
        imageUrl: String
    }
    type Query {
        products: [Product]
        product(id: ID!): Product
    }
`;

const BASE_URL = 'http://localhost:4000';

// List of products as mock data
const productsList = [
    { id: '1', name: 'Airpods', description: 'A great product',
        category: 'Electronics', brand: 'Apple', 
        price: 25000, imageUrl: `${BASE_URL}/images/electronics/large/airpods-big.jpg` },
      { id: '2', name: 'Balck Smartwatch', description: 'Another amazing product',
        category: 'Electronics', brand: 'Samsung',
        price: 40000, imageUrl: `${BASE_URL}/images/electronics/large/black-smartwatch-big.jpg` },
      { id: '3', name: 'Camera', description: 'Another amazing product',
        category: 'Electronics', brand: 'Nikon',
        price: 135000, imageUrl: `${BASE_URL}/images/electronics/large/camera-big.jpg` },
      { id: '4', name: 'Digital Camera', description: 'Another amazing product',
        category: 'Electronics', brand: 'Sony',
        price: 20000, imageUrl: `${BASE_URL}/images/electronics/large/digital-camera-big.jpeg` },
      { id: '5', name: 'Earpod', description: 'Another amazing product',
        category: 'Electronics', brand: 'Samsung',
        price: 4500, imageUrl: `${BASE_URL}/images/electronics/large/earpods-big.jpg` },
      { id: '6', name: 'Headset', description: 'Another amazing product',
        category: 'Electronics', brand: 'Sony',
        price: 11000, imageUrl: `${BASE_URL}/images/electronics/large/wired-headset-big.jpg` },
      { id: '7', name: 'Ipad Air', description: 'Another amazing product',
        category: 'Electronics', brand: 'Apple',
        price: 80000, imageUrl: `${BASE_URL}/images/electronics/large/ipad-air-big.webp` },
      { id: '8', name: 'Ipad', description: 'Another amazing product',
        category: 'Electronics', brand: 'Apple',
        price: 45000, imageUrl: `${BASE_URL}/images/electronics/large/ipad-big.png` },
      { id: '9', name: 'Iphone Earbuds', description: 'Another amazing product',
        category: 'Electronics', brand: 'Apple',
        price: 15000, imageUrl: `${BASE_URL}/images/electronics/large/iphone-earbuds-big.jpg` },
      { id: '10', name: 'Macbook', description: 'Another amazing product',
        category: 'Electronics', brand: 'Apple',
        price: 85000, imageUrl: `${BASE_URL}/images/electronics/large/macbook-big.jpeg` },
      { id: '11', name: 'Mouse', description: 'Another amazing product',
        category: 'Electronics', brand: 'Zebronics',
        price: 8000, imageUrl: `${BASE_URL}/images/electronics/large/mouse-big.jpeg` },
      { id: '12', name: 'Old Laptop', description: 'Another amazing product',
        category: 'Electronics', brand: 'Asus',
        price: 25000, imageUrl: `${BASE_URL}/images/electronics/large/old-laptop-big.webp` },
      { id: '13', name: 'Pendrive', description: 'Another amazing product',
        category: 'Electronics', brand: 'Sony',
        price: 1500, imageUrl: `${BASE_URL}/images/electronics/large/pendrive-big.webp` },
      { id: '14', name: 'Printer', description: 'Another amazing product',
        category: 'Electronics', brand: 'EPSON',
        price: 50000, imageUrl: `${BASE_URL}/images/electronics/large/printer-big.webp` },
      { id: '15', name: 'Smartwatch', description: 'Another amazing product',
        category: 'Electronics', brand: 'Samsung',
        price: 42000, imageUrl: `${BASE_URL}/images/electronics/large/smartwatch-big.png` },
      { id: '16', name: 'Tablet', description: 'Another amazing product',
        category: 'Electronics', brand: 'Samsung',
        price: 18000, imageUrl: `${BASE_URL}/images/electronics/large/tablet-big.jpg` },
      { id: '17', name: 'Wireless Headset', description: 'Another amazing product',
        category: 'Electronics', brand: 'Sony',
        price: 18000, imageUrl: `${BASE_URL}/images/electronics/large/wireless-headset-big.jpg` },
        // 'Beauty and Cosmetics' category
          {
            id: '18',
            name: 'Aveeno Moisturizing Lotion',
            description: 'A hydrating lotion that keeps your skin soft and supple.',
            category: 'Beauty and Cosmetics',
            brand: 'Aveeno',
            price: 4200,
            imageUrl: `${BASE_URL}/images/beauty/large/moisturizing1-lotion-big.jpeg`
          },
          {
            id: '19',
            name: 'Hydrating Moisturizing Lotion',
            description: 'A hydrating lotion that keeps your skin soft and supple.',
            category: 'Beauty and Cosmetics',
            brand: 'Neutrogena',
            price: 3200,
            imageUrl: `${BASE_URL}/images/beauty/large/moisturizing-lotion-big.png`
          },
          {
            id: '20',
            name: 'New Moisturizing Lotion',
            description: 'A hydrating lotion that keeps your skin soft and supple.',
            category: 'Beauty and Cosmetics',
            brand: 'Neutrogena',
            price: 5600,
            imageUrl: `${BASE_URL}/images/beauty/large/moisturizing-lotion-big.avif`
          },
          {
            id: '21',
            name: 'Matte Lipstick',
            description: 'A long-lasting matte lipstick in a vibrant shade.',
            category: 'Beauty and Cosmetics',
            brand: 'Maybelline',
            price: 1800,
            imageUrl: `${BASE_URL}/images/beauty/large/matte-lipstick-big.jpg`
          },
          {
            id: '22',
            name: 'Loreal Eyeliner Pen',
            description: 'A precision eyeliner pen for bold and defined eyes.',
            category: 'Beauty and Cosmetics',
            brand: 'L\'Oreal',
            price: 3600,
            imageUrl: `${BASE_URL}/images/beauty/large/eyeliner-pen.png`
          },
          {
            id: '23',
            name: 'New Eyeliner Pen',
            description: 'A precision eyeliner pen for bold and defined eyes.',
            category: 'Beauty and Cosmetics',
            brand: 'L\'Oreal',
            price: 600,
            imageUrl: `${BASE_URL}/images/beauty/large/eyeliner-pen1.webp`
          },
          {
            id: '24',
            name: 'Sesderma Facial Serum',
            description: 'A nourishing serum that enhances skin glow.',
            category: 'Beauty and Cosmetics',
            brand: 'The Ordinary',
            price: 1500,
            imageUrl: `${BASE_URL}/images/beauty/large/facial-serum-big.jpeg`
          },
          {
            id: '25',
            name: 'New Facial Serum',
            description: 'A nourishing serum that enhances skin glow.',
            category: 'Beauty and Cosmetics',
            brand: 'The Ordinary',
            price: 800,
            imageUrl: `${BASE_URL}/images/beauty/large/facial-serum1-big.avif`
          },
          {
            id: '26',
            name: 'Black Cotton T-Shirt',
            description: 'A comfortable and breathable black cotton t-shirt.',
            category: 'Clothing and Fashion',
            brand: 'H&M',
            price: 799,
            imageUrl: `${BASE_URL}/images/clothing/large/cotton-black-tshirt-big.webp`
          },
          {
            id: '27',
            name: 'Green Cotton T-Shirt',
            description: 'A comfortable and breathable green cotton t-shirt.',
            category: 'Clothing and Fashion',
            brand: 'H&M',
            price: 899,
            imageUrl: `${BASE_URL}/images/clothing/large/cotton-green-tshirt-big.jpg`
          },
          {
            id: '28',
            name: 'White Cotton T-Shirt',
            description: 'A comfortable and breathable white cotton t-shirt.',
            category: 'Clothing and Fashion',
            brand: 'H&M',
            price: 999,
            imageUrl: `${BASE_URL}/images/clothing/large/cotton-white-tshirt-big.webp`
          },
          {
            id: '29',
            name: 'Yellow Cotton T-Shirt',
            description: 'A comfortable and breathable yellow cotton t-shirt.',
            category: 'Clothing and Fashion',
            brand: 'H&M',
            price: 499,
            imageUrl: `${BASE_URL}/images/clothing/large/cotton-yellow-tshirt-big.avif`
          },
          {
            id: '30',
            name: 'Black and Blue Denim Jeans',
            description: 'Classic slim-fit denim black and blue jeans for everyday wear.',
            category: 'Clothing and Fashion',
            brand: 'Levi\'s',
            price: 5499,
            imageUrl: `${BASE_URL}/images/clothing/large/denim-black-blue-jeans-big.jpeg`
          },
          {
            id: '31',
            name: 'Black Denim Jeans',
            description: 'Classic slim-fit denim black jeans for everyday wear.',
            category: 'Clothing and Fashion',
            brand: 'H&M',
            price: 2299,
            imageUrl: `${BASE_URL}/images/clothing/large/denim-black-jeans-big.jpg`
          },
          {
            id: '32',
            name: 'Blue Denim Jeans',
            description: 'Classic slim-fit denim blue jeans for everyday wear.',
            category: 'Clothing and Fashion',
            brand: 'Levi\'s',
            price: 3299,
            imageUrl: `${BASE_URL}/images/clothing/large/denim-blue-jeans-big.webp`
          },
          {
            id: '33',
            name: 'Black Leather Jacket for Men',
            description: 'A stylish leather black jacket for men to elevate your look.',
            category: 'Clothing and Fashion',
            brand: 'Bikerz',
            price: 5999,
            imageUrl: `${BASE_URL}/images/clothing/large/men-leather-jacket-black-big.webp`
          },
          {
            id: '34',
            name: 'Brown Leather Jacket for Men',
            description: 'A stylish leather brown jacket for men to elevate your look.',
            category: 'Clothing and Fashion',
            brand: 'Bikerz',
            price: 6999,
            imageUrl: `${BASE_URL}/images/clothing/large/men-leather-jacket-brown-big.png`
          },
          {
            id: '35',
            name: 'Green Leather Jacket for Men',
            description: 'A stylish leather green jacket for men to elevate your look.',
            category: 'Clothing and Fashion',
            brand: 'Bikerz',
            price: 6999,
            imageUrl: `${BASE_URL}/images/clothing/large/men-leather-jacket-green-big.webp`
          },
          {
            id: '36',
            name: 'Blue Floral Dress for women',
            description: 'A chic floral blue dress perfect for summer outings.',
            category: 'Clothing and Fashion',
            brand: 'Zara',
            price: 5799,
            imageUrl: `${BASE_URL}/images/clothing/large/women-floral-dress-blue-big.png`
          },
          {
            id: '37',
            name: 'White Floral Dress for women',
            description: 'A chic floral white dress perfect for summer outings.',
            category: 'Clothing and Fashion',
            brand: 'Zara',
            price: 7799,
            imageUrl: `${BASE_URL}/images/clothing/large/women-floral-dress1-big.png`
          },
          {
            id: '38',
            name: 'Purple Floral Dress for women',
            description: 'A chic floral purple dress perfect for summer outings.',
            category: 'Clothing and Fashion',
            brand: 'Zara',
            price: 10599,
            imageUrl: `${BASE_URL}/images/clothing/large/women-floral-purple-dress-big.jpg`
          },
          {
            id: '39',
            name: 'Black Leather Jacket for women',
            description: 'A stylish leather black jacket for women to elevate your look.',
            category: 'Clothing and Fashion',
            brand: 'H&M',
            price: 8599,
            imageUrl: `${BASE_URL}/images/clothing/large/women-leather-jacket-black-big.jpg`
          },
          {
            id: '40',
            name: 'Red Leather Jacket for women',
            description: 'A stylish leather red jacket for women to elevate your look.',
            category: 'Clothing and Fashion',
            brand: 'H&M',
            price: 15900,
            imageUrl: `${BASE_URL}/images/clothing/large/women-leather-jacket-red-big.png`
          },
        
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
