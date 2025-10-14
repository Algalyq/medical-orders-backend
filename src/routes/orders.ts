import { Router, Request, Response } from 'express';
import { orderController } from '../controllers/orderController';

const router = Router();

router.post('/', (req: Request, res: Response) => orderController.createOrder(req, res));
router.get('/', (req: Request, res: Response) => orderController.getAllOrders(req, res));
router.get('/:id', (req: Request, res: Response) => orderController.getOrderById(req, res));
router.patch('/:id/accept', (req: Request, res: Response) => orderController.acceptOrder(req, res));
router.patch('/:id/complete', (req: Request, res: Response) =>
  orderController.completeOrder(req, res)
);
router.delete('/:id', (req: Request, res: Response) => orderController.deleteOrder(req, res));

export default router;