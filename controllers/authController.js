import { createUser, findUserByEmail, getAllUsers, saveUsers } from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs"

const SECRET_KEY = 'yetanother_secretkey'; 

export const registerUser = (req, res) => {
    const { name, email, password, mobile } = req.body;
    console.log(
       findUserByEmail(email)
    )

    if (findUserByEmail(email)) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = createUser(name, email, password, mobile);
    const users = getAllUsers();
    users.push(newUser);
    saveUsers(users);

    res.status(201).json({ message: 'User registered successfully', user: newUser });
};

export const loginUser = (req, res) => {
    const { email, password } = req.body;
    const user = findUserByEmail(email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY);
    res.json({ message: 'Login successful', token });
};
