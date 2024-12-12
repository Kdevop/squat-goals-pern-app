import express from 'express';
import { registerUser, logoutUser, loginUser, checkSession } from '../controllers/users.js';
import { isAuth } from './passport.config.js';

const userRouter = express.Router();
userRouter.post('/register', registerUser);
userRouter.post('/signin', loginUser);
userRouter.post('/oauth', (req, res, next) => {
    // will complete this route once front end developed, because require redirect and might be easier then
    return res.status(200).json({ message: 'This is the 3rd part sign in route.' });
});
userRouter.post('/logout', logoutUser);
userRouter.get('/session', isAuth, checkSession);

export { userRouter };
