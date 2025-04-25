
# 📝 Blogging Website

A full-stack blogging platform built with Node.js, Express, MongoDB, EJS, and JWT authentication. This application allows users to create, manage, and interact with blog posts and comments in a secure and user-friendly environment.

## 🚀 Features

### 🔐 Authentication
- User registration with secure password hashing
- JWT-based authentication for session management
- Login and logout functionality

### ✍️ Blogging
- Create new blog posts with titles and content
- Edit and update existing blog posts
- Delete blog posts
- View all blogs or filter by user
- Search for blogs with keywords

### 💬 Comments
- Add comments to blog posts
- Edit and delete own comments
- View all comments on a blog post

### 👍 Likes & Dislikes
- Like or dislike blog posts
- Toggle between like and dislike
- View like/dislike counts on each post

### 👤 User Dashboard
- View all blogs created by the user
- View all comments made by the user

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: EJS templating engine with server-side rendering
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Templating**: EJS for dynamic HTML rendering
- **Deployment**: [Railway](https://blogging-app.up.railway.app/)

## 📁 Project Structure

```bash
├── controllers/        # Route handlers
├── middlewares/        # Authentication and other middleware
├── models/             # Mongoose schemas
├── routes/             # Express routes
├── services/           # Business logic
├── views/              # EJS templates
├── public/             # Static assets (CSS, JS, images)
├── .env                # Environment variables
├── index.js            # Entry point
├── package.json        # Project metadata and dependencies
```

## 🧪 Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB instance running

### Installation

```bash
git clone https://github.com/Shashankg27/Blogging.git
cd Blogging
npm install
```

### Environment Variables

Create a `.env` file in the root directory and add the following:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Running the Application

```bash
npm start
```

Visit `http://localhost:3000` in your browser.

## 📄 License

This project is licensed under the MIT License.
