import express from 'express';
import * as reservationController from '../controllers/reservation.controller.js';
import * as authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();
router.get('/reserveCount', [authMiddleware.verifyToken], reservationController.getReservationCount);
router.get('/', [authMiddleware.verifyToken], reservationController.getReservations);
router.get('/:id', [authMiddleware.verifyToken], reservationController.getReservation);
router.post('/', [authMiddleware.verifyToken, authMiddleware.isServerOrManager], reservationController.createReservation);
router.put('/:id', [authMiddleware.verifyToken, authMiddleware.isServerOrManager], reservationController.updateReservation);
router.delete('/:id', [authMiddleware.verifyToken, authMiddleware.isServerOrManager], reservationController.deleteReservation);

export default router;