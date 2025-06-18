# BookReview Backend API

A RESTful API for a book review application built with Node.js, Express, and MongoDB.

## Project Overview

This backend application provides all the necessary endpoints for managing users, books, and reviews in a book review platform. It includes authentication, user management, and book review functionalities.

## Technologies Used

- **Node.js** - JavaScript runtime
- **Express** - Web framework for Node.js
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling for Node.js
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing

## Project Structure

```
backend/
│
├── config/          # Configuration files
│   └── db.js        # Database connection setup
│
├── middleware/      # Custom middleware
│   └── auth.js      # Authentication middleware
│
├── models/          # Database models
│   ├── Book.js      # Book model
│   └── User.js      # User model
│
├── routes/          # API routes
│   ├── auth.js      # Authentication routes
│   ├── books.js     # Book related routes
│   └── users.js     # User related routes
│
├── debug/           # Debug utilities
│   └── check-books.js
│
├── .gitignore       # Git ignore file
├── package.json     # Project dependencies
├── README.md        # Project documentation
└── server.js        # Main server file
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
   or with yarn:
   ```
   yarn install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

### Running the Server

Development mode:
```
npm run dev
```
or
```
yarn dev
```

Production mode:
```
npm start
```
or
```
yarn start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Books
- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get book by ID
- `POST /api/books` - Create a new book
- `PUT /api/books/:id` - Update book
- `DELETE /api/books/:id` - Delete book

## License

This project is licensed under the MIT License.
