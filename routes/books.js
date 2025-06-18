const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const User = require('../models/User');
const authenticateToken = require('../middleware/auth');

// Get all books
router.get('/', async (req, res) => {
  try {
    const { genre, minRating, featured, search } = req.query;
    const query = {};
    
    if (genre && genre !== 'all') query.genre = genre;
    if (minRating) query.averageRating = { $gte: parseFloat(minRating) };
    if (featured === 'true') query.featured = true;
    
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { title: searchRegex },
        { author: searchRegex }
      ];
    }
    
    const books = await Book.find(query);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a review to a book
router.post('/:id/reviews', authenticateToken, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const bookId = req.params.id;
    const userId = req.user.id;
    
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const newReview = {
      userId,
      userName: user.name,
      userAvatar: user.avatar,
      rating: parseInt(rating),
      comment,
      date: new Date()
    };
    
    book.reviews.push(newReview);
    await book.save();
    
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
