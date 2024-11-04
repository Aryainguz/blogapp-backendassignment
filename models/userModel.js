import { readFile, writeFile } from '../utils/fileUtills.js';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

const usersFilePath = 'data/users.json';

export const getAllUsers = () => readFile(usersFilePath);

export const saveUsers = (users) => writeFile(usersFilePath, users);

export const createUser = (name, email, password, mobile) => ({
    id: uuidv4(),
    name,
    email,
    password: bcrypt.hashSync(password, 10),
    mobile,
    role: 'user',
    followers: [],
    following: [],
    posts: [],
});

export const findUserByEmail = (email) => getAllUsers().find(user => user.email === email);
export const findUserById = (id) => getAllUsers().find(user => user.id === id);
