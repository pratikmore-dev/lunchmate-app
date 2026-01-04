import axiosInstance from './axiosInstance';


export const getVendorMenu =(vendorId:string)=>{
    console.log("vendorMenu  service triggered");
    return axiosInstance.get<any>(`/VendorMenu/${vendorId}/menus`);
}