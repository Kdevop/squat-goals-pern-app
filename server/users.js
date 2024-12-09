import express from 'express';
import { registerUser } from '../controllers/users.js';

const userRouter = express.Router();
userRouter.post('/register', registerUser);
userRouter.post('/signin', (req, res, next) => {
    return res.status(200).json({ message: 'This is the signin route.' });
});
userRouter.post('/oauth', (req, res, next) => {
    return res.status(200).json({ message: 'This is the 3rd part sign in route.' });
});
userRouter.post('/logout', (req, res, next) => {
    return res.status(200).json({ message: 'This is the logout route.' });
});
userRouter.get('/session', (req, res, next) => {
    return res.status(200).json({ message: 'This is the check session route.' });
});

export { userRouter };
