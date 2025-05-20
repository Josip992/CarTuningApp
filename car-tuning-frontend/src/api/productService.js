import axiosInstance from "../services/axiosInstance";
const API_BASE = "http://localhost:5000/api/products"

export const fetchProducts = async() => {
    console.log("fetchProducts called");
    const response = await axiosInstance.get(API_BASE);
    return response.data;
};

export const fetchCompatibleProducts = async (vehicleType) => {
    console.log("fetchCompatibleProducts called");
    const encodedType = encodeURIComponent(vehicleType);
    const response = await axiosInstance.get(API_BASE + "/compatible/" + encodedType);
    return response.data;
};
