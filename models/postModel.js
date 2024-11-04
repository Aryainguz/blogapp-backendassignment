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
    const postIndex = posts.findIndex(p => p.id === postId); 

    if (postIndex === -1) return null; 

    // Add the comment to the found post's comments array
    posts[postIndex].comments.push(comment);

    savePosts(posts);
    return posts[postIndex]; 
};


export const deleteCommentFromPost = (postId, commentId) => {
    const posts = getAllPosts(); 
    const postIndex = posts.findIndex(p => p.id === postId); 

    if (postIndex === -1) return null; 

    // Filter out the comment with the specified commentId from the post's comments
    posts[postIndex].comments = posts[postIndex].comments.filter(comment => comment.id !== commentId);

    savePosts(posts);
    return posts[postIndex];
};


export const likePost = (postId) => {
    const posts = getAllPosts();
    const post = posts.find(p => p.id === postId);

    if (!post) return null;

    post.likes += 1;
    savePosts(posts); 
    return post;
};

export const unlikePost = (postId) => {
    const posts = getAllPosts();
    const post = posts.find(p => p.id === postId);

    if (!post) return null;

    post.likes = Math.max(0, post.likes - 1); // Decrement likes, ensuring non-negative
    savePosts(posts); 
    return post;
};

// Get comments count
export const getCommentsCount = (postId) => {
    const post = findPostById(postId);
    if (!post) return null;

    return post.comments.length;
};
