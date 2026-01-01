import axiosInstance from "./axiosInstance";

// Update the Menu interface to include foodCategory
export interface Menu {
  menuID: string;
  menuName: string;
  foodCategoryID: string;
  description: string;
  isHalfAvailable: boolean;
  foodCategory?: {
    foodCategoryID: string;
    foodCategoryName: string;
    description: string;
    menus: string[];
    createdDate: string;
    createdBy: string;
    lastModifiedBy: string;
    lastModifiedDate: string;
    isActive: boolean;
  };
  createdDate: string;
  createdBy: string;
  lastModifiedBy: string;
  lastModifiedDate: string;
  isActive: boolean;
}

// Add request types
export interface CreateMenuRequest {
  MenuName: string;
  FoodCategoryID: string;
  Description: string;
  IsHalfAvailable: boolean;
  IsActive: boolean;
}

export const getMenu = () => {
  return axiosInstance.get<Menu[]>("/Menu");
};

export const getMenuById = (id: string) => {
  return axiosInstance.get<Menu>(`/Menu/${id}`);
};

export const createMenu = (payload: CreateMenuRequest) => {
  return axiosInstance.post("/Menu", payload);
};

export const updateMenu = (id: string, payload: CreateMenuRequest) => {
  return axiosInstance.put(`/Menu/${id}`, payload);
};

export const deleteMenu = (id: string) => {
  return axiosInstance.delete(`/Menu/${id}`);
};