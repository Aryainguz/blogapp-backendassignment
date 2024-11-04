import jwt from 'jsonwebtoken';

const SECRET_KEY = 'yetanother_secretkey'; 

export const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        if (req.method === 'GET' && req.path.startsWith('/public')) {
            return next(); // Allow access to public routes
        }
        return res.status(401).json({ message: 'Access denied' });
    }

    try {
        const verified = jwt.verify(token, SECRET_KEY);
        req.user = verified; // Attach user info from the token
        next();
    } catch (error) {
        return res.status(400).json({ message: 'Invalid token' });
    }
};

export const adminMiddleware = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next(); // Proceed if user is admin
    } else {
        return res.status(403).json({ message: 'Forbidden: Admins only' });
    }
};

export const registeredUserMiddleware = (req, res, next) => {
    if (req.user) {
        next(); // Proceed if user is logged in
    } else {
        return res.status(403).json({ message: 'Forbidden: Logged-in users only' });
    }
};
