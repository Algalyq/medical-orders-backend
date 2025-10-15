"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = exports.OrderService = void 0;
const database_1 = require("../config/database");
class OrderService {
    async createOrder(data) {
        return database_1.prisma.order.create({
            data: {
                clientId: data.clientId,
                serviceType: data.serviceType,
                address: data.address,
                price: data.price,
                status: 'PENDING',
                paymentStatus: 'UNPAID'
            }
        });
    }
    async getAllOrders() {
        return database_1.prisma.order.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }
    async getOrderById(id) {
        return database_1.prisma.order.findUnique({
            where: { id },
        });
    }
    async acceptOrder(id, data) {
        return database_1.prisma.order.update({
            where: { id },
            data: {
                status: 'ACCEPTED',
                medicId: data.medicId,
            },
        });
    }
    async completeOrder(id) {
        return database_1.prisma.order.update({
            where: { id },
            data: {
                status: 'COMPLETED',
                paymentStatus: 'PAID' // Assuming order is paid when completed
            },
        });
    }
    async deleteOrder(id) {
        return database_1.prisma.order.delete({
            where: { id },
        });
    }
}
exports.OrderService = OrderService;
exports.orderService = new OrderService();
