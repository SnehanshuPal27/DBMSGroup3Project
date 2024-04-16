import express from 'express';
import * as menuController from '../controllers/menu.controller.js';
import * as authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();
router.get('/ingridients', [authMiddleware.verifyToken], menuController.getMenuItemIngridientAll);
router.get('/ingridients/:id', [authMiddleware.verifyToken], menuController.getMenuItemIngridient);
router.get('/', [authMiddleware.verifyToken], menuController.getMenuItems);
router.get('/:id', [authMiddleware.verifyToken], menuController.getMenuItem);
router.post('/ingridientAdd', [authMiddleware.verifyToken, authMiddleware.isManager], menuController.createIngridient);

router.post('/', [authMiddleware.verifyToken, authMiddleware.isManager], menuController.createMenuItem);
router.put('/ing/:id1/:id2', [authMiddleware.verifyToken], menuController.updateIng);
router.put('/:id', [authMiddleware.verifyToken], menuController.updateMenuItem);
router.delete('/:id1/:id2', [authMiddleware.verifyToken], menuController.deleteMenuIngridient);

router.delete('/:id', [authMiddleware.verifyToken], menuController.deleteMenuItem);

export default router;