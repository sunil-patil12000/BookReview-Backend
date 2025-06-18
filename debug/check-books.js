const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Book = require('../models/Book');
require('dotenv').config();

const checkBooks = async () => {
  try {
    await connectDB();
    
    console.log('Connected to MongoDB successfully');
    
    const bookCount = await Book.countDocuments();
    console.log(`Total books in database: ${bookCount}`);
    
    if (bookCount === 0) {
      console.log('No books found in the database. You may need to run the seed script.');
      console.log('Run: npm run data:import');
    } else {
      const books = await Book.find().limit(2);
      console.log('Sample books:');
      books.forEach(book => {
        console.log(`- ${book.title} by ${book.author} (ID: ${book._id})`);
      });
    }
    
    process.exit();
  } catch (error) {
    console.error('Error checking books:', error);
    process.exit(1);
  }
};

checkBooks();
