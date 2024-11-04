import express from 'express';
import { createNewPost } from '../controllers/postController.js';

const router = express.Router();

router.post('/create', createNewPost);

export default router;
