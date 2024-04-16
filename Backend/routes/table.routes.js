import express from 'express';
import * as tableController from '../controllers/table.controller.js';
import * as authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', [authMiddleware.verifyToken], tableController.getTables);
router.get('/:id', [authMiddleware.verifyToken], tableController.getTable);
router.post('/', [authMiddleware.verifyToken, authMiddleware.isManager], tableController.createTable);
router.put('/:id', [authMiddleware.verifyToken, authMiddleware.isManager], tableController.updateTable);
router.delete('/:id', [authMiddleware.verifyToken, authMiddleware.isManager], tableController.deleteTable);

export default router;