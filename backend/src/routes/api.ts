import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import authController from '../controllers/authController';
import tripController from '../controllers/tripController';
import profileController from '../controllers/profileController';
import flightSearchController from '../controllers/flightSearchController';

const router = Router();

router.post('/auth/sync', authMiddleware, authController.syncAuth);

router.get('/trips/home', authMiddleware, tripController.getHomeTimeline);
router.get('/flights/:id/details', authMiddleware, tripController.getFlightDetails);

router.post('/profile/countries', authMiddleware, profileController.addVisitedCountry);

// Live flight search (Amadeus) - not user-scoped, no auth required to search
router.get('/flights/search', flightSearchController.search);
router.get('/locations/autocomplete', flightSearchController.autocomplete);

export default router;