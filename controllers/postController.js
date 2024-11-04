import { createPost, getAllPosts, savePosts } from '../models/postModel.js';
import { getAllUsers, saveUsers } from '../models/userModel.js'; 

export const createNewPost = (req, res) => {
    const { authorId, title, description } = req.body;
    const post = createPost(authorId, title, description); 

    // Get all users to find the one with the matching authorId
    const users = getAllUsers();
    const user = users.find(user => user.id === authorId); 

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Push the new post into the user's posts array
    user.posts.push(post); 
    saveUsers(users); 

    // Optionally, save posts if you want to keep a separate post list
    const posts = getAllPosts();
    posts.push(post);
    savePosts(posts);

    res.status(201).json({ message: 'Post created', post });
};
