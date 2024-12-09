import express from 'express';

const accountRouter = express.Router();
accountRouter.get('/:id', (req, res, next) => {
    const id = req.params.id;

    return res.status(200).json({ message: 'This is the account get route.', id: id });
});
accountRouter.post('/update', (req, res, post) => {
    return res.status(200).json({ message: 'This is the account update route.' });
});

export { accountRouter };