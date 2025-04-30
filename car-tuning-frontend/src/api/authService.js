import axios from "axios";
const API_BASE = "http://localhost:5000/api/auth"

export const loginUser = async(username, email, password) => {
    console.log("loginUser called");
    const response = await axios.post(API_BASE + "/login", {username, email, password});
    return response.data;
};

export const registerUser = async(username, email, password) => {
    console.log("registerUser called");
    const response = await axios.post(API_BASE + "/register", {username, email, password});
    return response.data;
};

export const logoutUser = async() => {
    console.log("logoutUser called");
    const response = await axios.get(API_BASE + "/logout");
    return response.data;
};

