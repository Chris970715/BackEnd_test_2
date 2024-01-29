import express from 'express';
import {getAllTour, createTour, getTour, updateTour, deleteTour, aliasTopTours, getTourStats, getMonthlyPlan} from '../controllers/tourControllers.js';


const router = express.Router();

router.route('/top-5-cheap').get(aliasTopTours, getAllTour);

router.route('/tour-stats').get(getTourStats);
router.route('/monthly-plan/:year').get(getMonthlyPlan);

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