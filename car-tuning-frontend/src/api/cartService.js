import axiosInstance from "../services/axiosInstance";
const API_BASE = "http://localhost:5000/api/cart/"


export const addToCart = async (userId, productId, quantity, vehicleType) => {
    console.log("addToCart called");
    const response = await axiosInstance.post(API_BASE + "add", {userId, productId, quantity, vehicleType});
    return response.data;
};

export const fetchCart = async (userId) => {
    console.log("fetchCart called");
    const response = await axiosInstance.get(API_BASE + userId);
    return response.data;
};

export const checkoutCart = async (userId) => {
    console.log("cartCheckout called");
    const response = await axiosInstance.post(API_BASE + "checkout", { userId });
    return response.data;
};

export const completeCartCheckout = async (userId) => {
    console.log("completeCartCheckout called");
    const response = await axiosInstance.post(API_BASE + "complete-checkout", { userId });
    return response.data;
};