import axiosInstance from "./axiosInstance";

export interface FoodCategory {
  foodCategoryID: string;
  foodCategoryName: string;
  description: string;
  menus: null;
  createdDate: string;
  createdBy: string;
  lastModifiedBy: string;
  lastModifiedDate: string;
  isActive: boolean;
}
// Add this NEW interface for creating a category
export interface CreateFoodCategoryRequest {
  FoodCategoryName: string;  
  Description: string;
  IsActive: boolean;
}

export interface UpdateFoodCategoryRequest {
  FoodCategoryName: string;
  Description: string;
  IsActive: boolean;
}



export const getFoodCategory = () => {
  return axiosInstance.get<FoodCategory[]>("/FoodCategory").then(response => {
    return response;
  });
};
export const getFoodCategoryById = (id: number) => {
  return axiosInstance.get<FoodCategory>(`/FoodCategory/${id}`);
};

export const createFoodCategory = (payload: CreateFoodCategoryRequest) => {
  console.log("Payload in service:", payload);
  return axiosInstance.post("/FoodCategory", payload);
};

export const updateFoodCategory = (id: string, payload: CreateFoodCategoryRequest) => {
  return axiosInstance.put(`/FoodCategory/${id}`, payload);
};

export const deleteFoodCategory = (id: string) => {
  return axiosInstance.delete(`/FoodCategory/${id}`);
};
