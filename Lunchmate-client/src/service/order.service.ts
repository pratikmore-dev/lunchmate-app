import axiosInstance from "./axiosInstance";

// Types matching your DTOs
export interface CreateOrderItemRequest {
  vendorMenuID: string;
  quantity: number;
  isHalfPortion: boolean;
  itemRate: number;
  subtotal: number;
}

export interface CreateOrderRequest {
  orderDate: string; // ISO string format
  totalAmount: number;
  employeeCut: number;
  companyCut: number;
  cashPaid: number;
  items: CreateOrderItemRequest[];
}

export interface OrderResponseDto {
  orderID: string;
  orderDate: string;
  totalAmount: number;
  employeeCut: number;
  companyCut: number;
  cashPaid: number;
  totalItems: number;
  totalVendors: number;
  createdDate: string;
}

export interface OrderApiResponse {
  status: number; // 1 = Success, 2 = Fail, 3 = NotFound
  message: string;
  data: OrderResponseDto;
  errors: string[];
}

// API Service
export const createOrder = (payload: CreateOrderRequest) => {
    console.log("Creating order with payload:", payload);
  return axiosInstance.post<OrderApiResponse>("/Order/place-order", payload);
};