import axiosInstance from "../services/axiosInstance";
const API_BASE = "http://localhost:5000/api/cart"


export const addToCart = async (userId, productId, quantity) => {
    console.log("addToCart called");
    const response = await axiosInstance.post(API_BASE + "/add", {userId, productId, quantity});
    return response.data;
};