import { createPost, getAllPosts, savePosts, addCommentToPost, deleteCommentFromPost } from '../models/postModel.js';
import { getAllUsers, saveUsers } from '../models/userModel.js';
import { v4 as uuidv4 } from 'uuid';


export const createNewPost = (req, res) => {
    const { title, description } = req.body;
    const authorId = req.user.id;

    const post = createPost(authorId, title, description);

    const users = getAllUsers();
    const user = users.find(user => user.id === authorId);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    user.posts.push(post.id);
    saveUsers(users);

    const posts = getAllPosts();
    posts.push(post);
    savePosts(posts);

    res.status(201).json({ message: 'Post created', post });
};

export const readAllPosts = (req, res) => {
    const posts = getAllPosts();
    res.json(posts);
};

export const editPost = (req, res) => {
    const { postId } = req.params;
    const { title, description } = req.body;
    const posts = getAllPosts();
    const postIndex = posts.findIndex(post => post.id === postId);

    if (postIndex === -1) return res.status(404).json({ message: 'Post not found' });

    const post = posts[postIndex];
    if (req.user.role !== 'admin' && post.authorId !== req.user.id) {
        return res.status(403).json({ message: 'Forbidden: You can only edit your own posts' });
    }

    posts[postIndex] = { ...post, title, description, updatedAt: new Date() };
    savePosts(posts);
    res.json({ message: 'Post updated successfully', post: posts[postIndex] });
};

export const deletePost = (req, res) => {
    const { postId } = req.params;
    const posts = getAllPosts();
    const postIndex = posts.findIndex(post => post.id === postId);

    if (postIndex === -1) return res.status(404).json({ message: 'Post not found' });

    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Only admins can delete posts' });
    }

    posts.splice(postIndex, 1);
    savePosts(posts);
    res.json({ message: 'Post deleted successfully' });
};

export const addComment = (req, res) => {
    const { postId } = req.params;
    const { commentText } = req.body;

    const comment = {
        id: uuidv4(),
        authorId: req.user.id,
        text: commentText,
        createdAt: new Date(),
    };

    const post = addCommentToPost(postId, comment);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    res.status(201).json({ message: 'Comment added', post });
};

export const deleteComment = (req, res) => {
    const { postId, commentId } = req.params;

    const post = deleteCommentFromPost(postId, commentId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const comment = post.comments.find(comment => comment.id === commentId);
    if (comment && comment.authorId !== req.user.id) {
        return res.status(403).json({ message: 'Forbidden: You can only delete your own comments' });
    }

    res.json({ message: 'Comment deleted', post });
};
