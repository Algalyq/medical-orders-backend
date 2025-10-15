"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = exports.OrderController = void 0;
const orderService_1 = require("../services/orderService");
class OrderController {
    async createOrder(req, res) {
        try {
            const data = req.body;
            const order = await orderService_1.orderService.createOrder(data);
            const response = {
                success: true,
                data: order,
            };
            res.status(201).json(response);
        }
        catch (error) {
            const response = {
                success: false,
                error: 'Failed to create order',
            };
            res.status(400).json(response);
        }
    }
    async getAllOrders(req, res) {
        try {
            const orders = await orderService_1.orderService.getAllOrders();
            const response = {
                success: true,
                data: orders,
            };
            res.json(response);
        }
        catch (error) {
            const response = {
                success: false,
                error: 'Failed to fetch orders',
            };
            res.status(500).json(response);
        }
    }
    async getOrderById(req, res) {
        try {
            const { id } = req.params;
            const order = await orderService_1.orderService.getOrderById(id);
            if (!order) {
                res.status(404).json({ success: false, error: 'Order not found' });
                return;
            }
            const response = {
                success: true,
                data: order,
            };
            res.json(response);
        }
        catch (error) {
            const response = {
                success: false,
                error: 'Failed to fetch order',
            };
            res.status(500).json(response);
        }
    }
    async acceptOrder(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            const order = await orderService_1.orderService.acceptOrder(id, data);
            const response = {
                success: true,
                data: order,
            };
            res.json(response);
        }
        catch (error) {
            const response = {
                success: false,
                error: 'Failed to accept order',
            };
            res.status(400).json(response);
        }
    }
    async completeOrder(req, res) {
        try {
            const { id } = req.params;
            const order = await orderService_1.orderService.completeOrder(id);
            const response = {
                success: true,
                data: order,
            };
            res.json(response);
        }
        catch (error) {
            const response = {
                success: false,
                error: 'Failed to complete order',
            };
            res.status(400).json(response);
        }
    }
    async deleteOrder(req, res) {
        try {
            const { id } = req.params;
            const order = await orderService_1.orderService.deleteOrder(id);
            const response = {
                success: true,
                data: order,
            };
            res.json(response);
        }
        catch (error) {
            const response = {
                success: false,
                error: 'Failed to delete order',
            };
            res.status(400).json(response);
        }
    }
}
exports.OrderController = OrderController;
exports.orderController = new OrderController();
