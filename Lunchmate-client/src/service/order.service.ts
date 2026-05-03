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

export interface OrderHistoryItem {
  orderItemID: string;
  vendorMenuID: string;
  menuID: string;
  menuName: string;
  vendorID: string;
  vendorName: string;
  quantity: number;
  isHalfPortion: boolean;
  itemRate: number;
  subtotal: number;
}

export interface OrderHistoryResponse {
  orderID: string;
  orderDate: string;
  totalAmount: number;
  employeeCut: number;
  companyCut: number;
  cashPaid: number;
  totalItems: number;
  totalVendors: number;
  items: OrderHistoryItem[];
}

// API Service
export const createOrder = (payload: CreateOrderRequest) => {
    console.log("Creating order with payload:", payload);
  return axiosInstance.post<OrderApiResponse>("/Order/place-order", payload);
};

export const getOrderHistory = () => {
  return axiosInstance.get<OrderHistoryResponse[]>("/Order/history");
};

export const getOrderHistoryById = (id: string) => {
  return axiosInstance.get<OrderHistoryResponse>(`/Order/history/${id}`);
};
