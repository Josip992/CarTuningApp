import axios from "axios";
const API_BASE = "http://localhost:5000/api/users"
import { useAuthContext } from "../contexts/AuthContext";

const { setUser } = useAuthContext();

export const loginUser = async(username, email, password) => {
    const response = await axios.post(API_BASE + "/login", {username, email, password});
    return response.data;
};

export const registerUser = async(username, email, password) => {
    const response = await axios.post(API_BASE + "/regiter", {username, email, password});
    setUser(response.user);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);
};

export const logoutUser = async() => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
};

