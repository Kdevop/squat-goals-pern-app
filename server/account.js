import express from 'express';
import { userDetails, updateDetails } from '../controllers/account.js';
import { isAuth } from './passport.config.js';

const accountRouter = express.Router();
accountRouter.get('/:id', isAuth, userDetails);
accountRouter.post('/update', isAuth, updateDetails);

export { accountRouter };