import axiosInstance from './axiosInstance';


export const getVendorMenu =(vendorId:string)=>{
    return axiosInstance.get<any>(`/VendorMenu/${vendorId}/menus`);
}