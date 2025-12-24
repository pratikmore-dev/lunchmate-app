import axiosInstance from "./axiosInstance";

export interface Menu {
  menuID: string;
  menuName: string;
  foodCategoryID: string;
  description: string;
  isHalfAvailable: boolean;
  createdDate: string;
  createdBy: string;
  lastModifiedBy: string;
  lastModifiedDate: string;
  isActive: boolean;
}

export const getMenu = () => {
  return axiosInstance.get<Menu[]>("/Menu").then(response => {
    return response;
  });
};
export const getMenuById = (id: number) => {
  return axiosInstance.get<Menu>(`/Menu/${id}`);
};

export const createMenu = (payload: Menu) => {
  return axiosInstance.post("/Menu", payload);
};

export const updateMenu = (payload: Menu) => {
  return axiosInstance.put("/Menu", payload);
};

export const deleteMenu = (id: number) => {
  return axiosInstance.delete(`/Menu/${id}`);
};
