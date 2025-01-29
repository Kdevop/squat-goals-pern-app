import { body, param, validationResult } from 'express-validator';

const checkValidationRegistration = (req, res, next) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
        const errorMessage = result.errors.map(err => {
            const param = err.param || 'unknown';
            return `${param}: ${err.msg}`;
        }).join('\n');
        return res.status(400).json({ success: false, errors: errorMessage });
    }
    next();
};

const registrationValidationRules = [
    body('email').isEmail().normalizeEmail().withMessage('Enter a valid email address'),
    body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('name').trim().notEmpty().escape().withMessage('Username is required')
];

const dashboardValidationsRules = [
    param('id').isInt().withMessage('User ID must be an integer.')
];

const checkValidationDashboard = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
};

const addWorkoutValidationRules = [
    body('exercise_id').isInt().withMessage('Exercise ID must be an integer'),
    body('sets').isInt().withMessage('Sets must be an integer'),
    body('reps').isInt().withMessage('Reps must be an integer'),
    body('weight').isInt().withMessage('Weight must be a number'),
    body('duration').isInt().withMessage('Duration must be a number'),
    body('user_customer_id').isInt().withMessage('User ID must be an integer'),
    body('date').isISO8601().withMessage('Date must be in ISO 8601 format')    
];

const validateRetrieveWorkouts = [
    param('id').isInt().withMessage('User ID must be an integer'),
    param('date').isISO8601().withMessage('Date must be in ISO 8601 format')
];

const validateDeleteWorkouts = [
    param('id').isInt().withMessage('Workout ID must be an integer'),
    body('userId').isInt().withMessage('User ID must be an integer')
];

const validateUserDetails = [
    param('id').isInt().withMessage('User ID must be an integer'),
];

const validateUpdateDetails = [
    body('id').isInt().withMessage('User ID must be an integer'),
    body('email').optional().isEmail().withMessage('Invalid email format'),
    body('name').optional().isString().withMessage('Name must be a string'),
    body('password').optional().trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

// written for workouts, but might be able to use elsewhere. Will check as we move through. Can replace the one for dashboard.
const checkValidations = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
};

export { 
    checkValidationRegistration, 
    registrationValidationRules, 
    dashboardValidationsRules, 
    checkValidationDashboard, 
    checkValidations, 
    addWorkoutValidationRules, 
    validateRetrieveWorkouts, 
    validateDeleteWorkouts,
    validateUserDetails,
    validateUpdateDetails
};

