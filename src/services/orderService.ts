import { prisma } from '../config/database';
import { Order, CreateOrderDTO, AcceptOrderDTO } from '../types';
import { Prisma } from '@prisma/client';

export class OrderService {
  async createOrder(data: CreateOrderDTO): Promise<Order> {
    return prisma.order.create({
      data: {
        clientId: data.clientId,
        serviceType: data.serviceType,
        address: data.address,
        price: data.price,
        status: 'PENDING',
        paymentStatus: 'UNPAID'
      }
    }) as unknown as Promise<Order>;
  }

  async getAllOrders(): Promise<Order[]> {
    return prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
    }) as Promise<Order[]>;
  }

  async getOrderById(id: string): Promise<Order | null> {
    return prisma.order.findUnique({
      where: { id },
    }) as Promise<Order | null>;
  }

  async acceptOrder(id: string, data: AcceptOrderDTO): Promise<Order> {
    return prisma.order.update({
      where: { id },
      data: {
        status: 'ACCEPTED',
        medicId: data.medicId,
      },
    }) as unknown as Promise<Order>;
  }

  async completeOrder(id: string): Promise<Order> {
    return prisma.order.update({
      where: { id },
      data: { 
        status: 'COMPLETED',
        paymentStatus: 'PAID' // Assuming order is paid when completed
      },
    }) as unknown as Promise<Order>;
  }

  async deleteOrder(id: string): Promise<Order> {
    return prisma.order.delete({
      where: { id },
    }) as Promise<Order>;
  }
}

export const orderService = new OrderService();