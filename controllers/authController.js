import { getAllUsers, saveUsers, createUser, findUserByEmail } from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = (req, res) => {
    const { name, email, password, mobile } = req.body;
    const existingUser = findUserByEmail(email);

    if (existingUser) return res.status(400).json({ message: 'Email already registered' });

    const user = createUser(name, email, password, mobile);
    const users = getAllUsers();
    users.push(user);
    saveUsers(users);

    res.status(201).json({ message: 'User registered', user });
};

export const login = (req, res) => {
    const { email, password } = req.body;
    const user = findUserByEmail(email);

    if (!user || !bcrypt.compareSync(password, user.password))
        return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, 'secretkey', { expiresIn: '1h' });
    res.json({ message: 'Logged in', token });
};
