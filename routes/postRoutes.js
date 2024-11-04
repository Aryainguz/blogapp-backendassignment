import express from 'express';
import {
    createNewPost,
    readAllPosts,
    editPost,
    deletePost,
    addComment,
    deleteComment
} from '../controllers/postController.js';
import { authMiddleware, adminMiddleware, registeredUserMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', authMiddleware, registeredUserMiddleware, createNewPost); // Create new post
router.get('/', readAllPosts); // Read all posts (public access)
router.put('/:postId', authMiddleware, registeredUserMiddleware, editPost); // Edit post
router.delete('/:postId', authMiddleware, adminMiddleware, deletePost); // Delete post
router.post('/:postId/comments', authMiddleware, registeredUserMiddleware, addComment); // Add comment
router.delete('/:postId/comments/:commentId', authMiddleware, registeredUserMiddleware, deleteComment); // Delete comment

export default router;
