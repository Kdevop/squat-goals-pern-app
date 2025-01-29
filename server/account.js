import express from 'express';
import { userDetails, updateDetails } from '../controllers/account.js';
import { isAuth } from './passport.config.js';
import { validateUserDetails, validateUpdateDetails, checkValidations } from '../utils/validators.js';

const accountRouter = express.Router();
accountRouter.get('/:id', isAuth, validateUserDetails, checkValidations, userDetails);
accountRouter.post('/update', isAuth, validateUpdateDetails, checkValidations, updateDetails);

export { accountRouter }; 