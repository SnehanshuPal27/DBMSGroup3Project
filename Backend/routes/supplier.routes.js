import express from 'express';
import * as supplierController from '../controllers/supplier.controller.js';
import * as authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', [authMiddleware.verifyToken, authMiddleware.isManager], supplierController.getSuppliers);
router.get('/:id', [authMiddleware.verifyToken, authMiddleware.isManager], supplierController.getSupplier);
router.post('/', [authMiddleware.verifyToken, authMiddleware.isManager], supplierController.createSupplier);
router.put('/:id', [authMiddleware.verifyToken, authMiddleware.isManager], supplierController.updateSupplier);
router.delete('/:id', [authMiddleware.verifyToken, authMiddleware.isManager], supplierController.deleteSupplier);

export default router;