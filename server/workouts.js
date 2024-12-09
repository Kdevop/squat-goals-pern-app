import express from 'express';

const workoutsRouter = express.Router();
workoutsRouter.get('/:date/:id', (req, res, next) => {

    const date = req.params.date;
    const id = req.params.id;

    return res.status(200).json({ message: 'This is the get workouts route.', date: date, id: id });
});
workoutsRouter.post('/add', (req, res, next) => {
    return res.status(200).json({ message: 'This is the add workout route.' });
});
workoutsRouter.delete('/delete/:id', (req, res, next) => {
    const id = req.params.id;

    return res.status(200).json({ message: 'This is the delete workout Route.', id: id });
});

export { workoutsRouter };