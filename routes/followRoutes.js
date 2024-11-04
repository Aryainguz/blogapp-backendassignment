import express from 'express';
import { followUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/:userId/follow/:followId', followUser);

export default router;
