import express from 'express';
import * as employeeController from '../controllers/employee.controller.js';
import * as authMiddleware from '../middleware/auth.middleware.js';
import * as authController from '../controllers/auth.controller.js'
const router = express.Router();
router.post('/managerAddEmp', [authMiddleware.verifyToken, authMiddleware.isManager], authController.signup);
router.get('/managerStats', [authMiddleware.verifyToken, authMiddleware.isManager], employeeController.getManagerStats);
router.get('/chefCount', [authMiddleware.verifyToken, authMiddleware.isManager], employeeController.getCountChef);
router.get('/', [authMiddleware.verifyToken, authMiddleware.isManager], employeeController.getEmployees);
router.get('/:id', [authMiddleware.verifyToken], employeeController.getEmployee);
router.put('/:id', [authMiddleware.verifyToken, authMiddleware.isManager], employeeController.updateEmployee);
router.delete('/:id', [authMiddleware.verifyToken, authMiddleware.isManager], employeeController.deleteEmployee);

export default router;