import express from 'express';
import {getAllTour, createTour, getTour, updateTour, deleteTour, aliasTopTours} from '../controllers/tourControllers.js';


const router = express.Router();

router.route('/top-5-cheap').get(aliasTopTours, getAllTour);

router
    .route('/')
    .get(getAllTour)
    .post(createTour);

router
    .route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);

export default router;