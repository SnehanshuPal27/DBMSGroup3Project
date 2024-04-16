import express from 'express';
import * as menuController from '../controllers/menu.controller.js';
import * as authMiddleware from '../middleware/auth.middleware.js';
import * as inventoryController from "../controllers/inventory.controller.js"

const router = express.Router();
router.get('/', [authMiddleware.verifyToken], inventoryController.getInventory);

router.post('/update', [authMiddleware.verifyToken], inventoryController.updateInventoryItem);
router.post('/', [authMiddleware.verifyToken, authMiddleware.isManager], inventoryController.createInventoryItem);
router.delete('/:id', [authMiddleware.verifyToken, authMiddleware.isManager], inventoryController.deleteInventoryItem);
router.put('/:id', [authMiddleware.verifyToken], inventoryController.updateInventoryItem);
export default router;