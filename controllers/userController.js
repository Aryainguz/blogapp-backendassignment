import { getAllUsers, saveUsers, findUserById } from '../models/userModel.js';

export const followUser = (req, res) => {
    const { userId, followId } = req.params;
    const users = getAllUsers();
    const user = findUserById(userId);
    const followUser = findUserById(followId);

    if (!user || !followUser) return res.status(404).json({ message: 'User not found' });

    if (user.following.includes(followId)) {
        return res.status(400).json({ message: 'You are already following this user' });
    }

    user.following.push(followId);
    followUser.followers.push(userId);

    const updatedUsers = users.map((u) => {
        if (u.id === user.id) return user;
        if (u.id === followUser.id) return followUser;
        return u;
    });

    saveUsers(updatedUsers);

    res.json({ message: 'User followed', user });
};
