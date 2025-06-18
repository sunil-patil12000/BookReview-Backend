const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  userAvatar: {
    type: String
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  genre: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  coverImage: {
    type: String,
    required: true
  },
  publishYear: Number,
  pages: Number,
  featured: {
    type: Boolean,
    default: false
  },
  reviews: [reviewSchema],
  averageRating: {
    type: Number,
    default: 0
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Calculate rating and review count before saving
bookSchema.pre('save', function(next) {
  if (this.reviews.length === 0) {
    this.averageRating = 0;
    this.totalReviews = 0;
    return next();
  }
  
  const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
  this.averageRating = Math.round((totalRating / this.reviews.length) * 10) / 10;
  this.totalReviews = this.reviews.length;
  
  next();
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
