import express from 'express';
import { registerUser, logoutUser, loginUser, checkSession, githubCallback } from '../controllers/users.js';
import { isAuth } from './passport.config.js';
import passport from 'passport';

const userRouter = express.Router();
userRouter.post('/register', registerUser);
userRouter.post('/signin', loginUser);
userRouter.get('/auth/github', passport.authenticate('github'))
userRouter.get('/auth/github/callback', githubCallback);
userRouter.post('/logout', logoutUser);
userRouter.get('/session', isAuth, checkSession);

export { userRouter };
