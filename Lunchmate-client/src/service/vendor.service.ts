import axiosInstance from "./axiosInstance";

export interface Vendor {
  vendorID: string;
  vendorName: string;
  foodCategoryName:string;
  address: string;
  phone: string;
  email: string;
  ownerID: string;
  createdDate: string;
  createdBy: string;
  lastModifiedBy: string;
  lastModifiedDate: string;
  isActive: boolean;
}
// Add this NEW interface for creating a category
export interface CreateVendorRequest {
  foodCategoryName:string;
  vendorName: string;  
  address: string;
  phone: string;
  email: string;
  ownerID: string;
}

export interface UpdateFoodCategoryRequest {
  foodCategoryName:string;
  vendorName: string;  
  address: string;
  phone: string;
  email: string;
  ownerID: string;
}



export const getVendor = () => {
  return axiosInstance.get<Vendor[]>("/Vendor").then(response => {
    return response;
  });
};
export const getVendorById = (id: string) => {
  return axiosInstance.get<Vendor>(`/Vendor/${id}`);
};

export const createVendor = (payload: CreateVendorRequest) => {
  return axiosInstance.post("/Vendor", payload);
};

export const updateVendor = (id: string, payload: UpdateFoodCategoryRequest) => {
  return axiosInstance.put(`/Vendor/${id}`, payload);
};

export const deleteVendor = (id: string) => {
  return axiosInstance.delete(`/Vendor/${id}`);
};
