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
    comments: [],
    createdAt: new Date(),
    updatedAt: new Date(),
});

export const findPostById = (id) => getAllPosts().find(post => post.id === id);

export const addCommentToPost = (postId, comment) => {
    const posts = getAllPosts(); // Fetch all posts
    const postIndex = posts.findIndex(p => p.id === postId); // Find the index of the post

    if (postIndex === -1) return null; // If post doesn't exist

    // Add the comment to the found post's comments array
    posts[postIndex].comments.push(comment);

    // Save the updated posts array back to the data source
    savePosts(posts);
    return posts[postIndex]; // Return the updated post
};


export const deleteCommentFromPost = (postId, commentId) => {
    const posts = getAllPosts(); // Fetch all posts
    const postIndex = posts.findIndex(p => p.id === postId); // Find the index of the post

    if (postIndex === -1) return null; // If post doesn't exist

    // Filter out the comment with the specified commentId from the post's comments
    posts[postIndex].comments = posts[postIndex].comments.filter(comment => comment.id !== commentId);

    // Save the updated posts array back to the data source
    savePosts(posts);
    return posts[postIndex]; // Return the updated post
};

