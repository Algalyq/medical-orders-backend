export type OrderStatus = 'PENDING' | 'ACCEPTED' | 'COMPLETED';
export type PaymentStatus = 'UNPAID' | 'PAID';

export interface Order {
  id: string;
  clientId: string;
  medicId: string | null;
  serviceType: string;
  address: string;
  price: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateOrderDTO {
  clientId: string;
  serviceType: string;
  address: string;
  price: number;
}

export interface AcceptOrderDTO {
  medicId: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  }