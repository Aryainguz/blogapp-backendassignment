import { readFile, writeFile } from '../utils/fileUtills.js';
import { v4 as uuidv4 } from 'uuid';

const postsFilePath = 'data/posts.json';

export const getAllPosts = () => readFile(postsFilePath);
export const savePosts = (posts) => writeFile(postsFilePath, posts);

export const createPost = (authorId, title, description) => ({
    id: uuidv4(),
    authorId,
    title,
    description,
    likes: 0,
    comments: []
});

export const findPostById = (id) => getAllPosts().find(post => post.id === id);
