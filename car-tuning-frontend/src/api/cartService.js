import axiosInstance from "../services/axiosInstance";
const API_BASE = "http://localhost:5000/api/cart/"


export const addToCart = async (userId, productId, quantity) => {
    console.log("addToCart called");
    const response = await axiosInstance.post(API_BASE + "add", {userId, productId, quantity});
    return response.data;
};

export const fetchCart = async (userId) => {
    console.log("fetchCart called");
    const response = await axiosInstance.get(API_BASE + userId);
    console.log(response.data);
    return response.data;
};