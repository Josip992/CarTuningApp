import axios from "axios";
const API_BASE = "http://localhost:5000/api/products"

export const fetchProducts = async() => {
    console.log("fetchProducts called");
    const response = await axios.get(API_BASE);
    return response.data;
};

export const fetchCompatibleProducts = async (vehicleType) => {
    console.log("fetchCompatibleProducts called");
    const encodedType = encodeURIComponent(vehicleType);
    const response = await axios.get(API_BASE + "/compatible/" + encodedType);
    return response.data;
};
