import express from 'express';

const dashboardRouter = express.Router();
dashboardRouter.get('/:id', (req, res, next) => {

    const id = req.params.id;

    return res.status(200).json({ message: 'This is the dashboard router.', id: id });
});

export { dashboardRouter };