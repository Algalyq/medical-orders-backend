
import { Request, Response } from 'express';
import { orderService } from '../services/orderService';
import { CreateOrderDTO, AcceptOrderDTO, ApiResponse } from '../types';

export class OrderController {
  async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const data: CreateOrderDTO = req.body;
      const order = await orderService.createOrder(data);
      const response: ApiResponse<typeof order> = {
        success: true,
        data: order,
      };
      res.status(201).json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Failed to create order',
      };
      res.status(400).json(response);
    }
  }

  async getAllOrders(req: Request, res: Response): Promise<void> {
    try {
      const orders = await orderService.getAllOrders();
      const response: ApiResponse<typeof orders> = {
        success: true,
        data: orders,
      };
      res.json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Failed to fetch orders',
      };
      res.status(500).json(response);
    }
  }

  async getOrderById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const order = await orderService.getOrderById(id);
      if (!order) {
        res.status(404).json({ success: false, error: 'Order not found' });
        return;
      }
      const response: ApiResponse<typeof order> = {
        success: true,
        data: order,
      };
      res.json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Failed to fetch order',
      };
      res.status(500).json(response);
    }
  }

  async acceptOrder(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data: AcceptOrderDTO = req.body;
      const order = await orderService.acceptOrder(id, data);
      const response: ApiResponse<typeof order> = {
        success: true,
        data: order,
      };
      res.json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Failed to accept order',
      };
      res.status(400).json(response);
    }
  }

  async completeOrder(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const order = await orderService.completeOrder(id);
      const response: ApiResponse<typeof order> = {
        success: true,
        data: order,
      };
      res.json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Failed to complete order',
      };
      res.status(400).json(response);
    }
  }

  async deleteOrder(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const order = await orderService.deleteOrder(id);
      const response: ApiResponse<typeof order> = {
        success: true,
        data: order,
      };
      res.json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Failed to delete order',
      };
      res.status(400).json(response);
    }
  }
}

export const orderController = new OrderController();