import express from 'express';
import * as orderController from '../controllers/order.controller.js';
import * as authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();
router.get('/orderCount', [authMiddleware.verifyToken], orderController.getCountOrders);
router.get('/highestOrderIndex', [authMiddleware.verifyToken],orderController.getHighestOrderIndex)
router.get('/orderItems', [authMiddleware.verifyToken], orderController.getAllOrderItems);
router.get('/readyItems', [authMiddleware.verifyToken], orderController.getAllReadyItems);
router.get('/', [authMiddleware.verifyToken], orderController.getOrders);
router.get('/:id', [authMiddleware.verifyToken], orderController.getOrder);
router.post("/createReadyItem",[authMiddleware.verifyToken], orderController.createReadyItem)
router.post("/createOrderItem",[authMiddleware.verifyToken], orderController.createOrderItem)
router.post('/', [authMiddleware.verifyToken], orderController.createOrder);
router.put('/:id', [authMiddleware.verifyToken, authMiddleware.isServer], orderController.updateOrder);
router.delete('/delOrderItem/:id', [authMiddleware.verifyToken], orderController.deleteOrderItem);
router.delete('/delReadyItem/:id', [authMiddleware.verifyToken], orderController.deleteReadyItem);
router.delete('/:id', [authMiddleware.verifyToken, authMiddleware.isManager], orderController.deleteOrder);

export default router;