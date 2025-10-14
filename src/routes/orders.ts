import { Router } from 'express';
import { orderController } from '../controllers/orderController';

const router = Router();

router.post('/', (req, res) => orderController.createOrder(req, res));
router.get('/', (req, res) => orderController.getAllOrders(req, res));
router.get('/:id', (req, res) => orderController.getOrderById(req, res));
router.patch('/:id/accept', (req, res) => orderController.acceptOrder(req, res));
router.patch('/:id/complete', (req, res) =>
  orderController.completeOrder(req, res)
);
router.delete('/:id', (req, res) => orderController.deleteOrder(req, res));

export default router;