# Backend Assignment - Social Media Blog App

This project is a simple backend for a social media blog app built with Node.js and Express. It allows users to create posts, add comments, like/unlike posts, and retrieve comment counts for each post. The project uses file-based storage to simulate a database.

## Features

- **User Registration**: Register a new user with a unique email.
- **Post Creation**: Authenticated users can create posts.
- **Comments**: Users can add and delete comments on posts.
- **Likes**: Users can like and unlike posts.
- **Comment Count**: Retrieve the number of comments on a post.

## Project Structure

- `controllers/`: Contains controllers for handling post and comment actions.
- `models/`: Contains data models for posts and users.
- `routes/`: Defines routes for posts and comments.
- `utils/`: Utility functions for file handling (reading/writing JSON files).

## Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <repository_directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the server:
   ```bash
   npm start
   ```


## API Endpoints

### Auth Routes
- **POST /api/v1/auth/register**: Register new user.
- **POST /api/v1/auth/login**: Login user.

### Follow Routes
- **POST /api/v1/user/:userId/follow/:followId**: Follow new user.

### Posts
- **POST /api/v1/post/create**: Create a new post.
- **POST /api/v1/post**: Get all posts.
- **GET /api/v1/post/:postId/comments/count**: Get the comment count for a post.


### Like/Unlike Posts
- **POST /api/v1/post/:postId/like**: Like a post.
- **POST /api/v1/post/:postId/unlike**: Unlike a post.

### Comments
- **POST /api/v1/post/:postId/comments**: Add a comment to a post.
- **DELETE /api/v1/post/:postId/comments/:commentId**: Delete a comment.


## Utility Functions

- **readFile**: Reads data from a file and parses it as JSON.
- **writeFile**: Writes data to a file in JSON format.

## Example Usage

To like a post:
```bash
POST /api/v1/post/:postId/like
```

To get the comment count for a post:
```bash
GET /api/v1/post/:postId/comments/count
```


Made with ❤️ By Aryainguz
