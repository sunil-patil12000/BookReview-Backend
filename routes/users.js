const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Book = require('../models/Book');
const authenticateToken = require('../middleware/auth');

// Get user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { name, bio, currentPassword, newPassword } = req.body;
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (name) user.name = name;
    if (bio) user.bio = bio;
    
    if (currentPassword && newPassword) {
      const validPassword = await user.comparePassword(currentPassword);
      
      if (!validPassword) {
        return res.status(400).json({ message: 'Current password is incorrect' });
      }
      
      user.password = newPassword;
    }
    
    await user.save();
    
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's reviews
router.get('/reviews', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    
    const books = await Book.find({ 'reviews.userId': userId });
    
    const userReviews = books.flatMap(book => 
      book.reviews
        .filter(review => review.userId.toString() === userId)
        .map(review => ({
          ...review.toObject(),
          bookId: book._id,
          bookTitle: book.title,
          bookCover: book.coverImage
        }))
    );
    
    res.json(userReviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
