import express from 'express';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
app.use(express.json());

// API paths
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/user', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));