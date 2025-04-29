import axios from "axios";
import axiosInstance from "../services/axiosInstance";
const API_BASE = "http://localhost:5000/api/vehicles"

export const fetchVehicles = async() => {
    console.log("fetchVehicles called");
    const response = await axiosInstance.get(API_BASE);
    return response.data;
};

export const fetchMakes = async() => {
    console.log("fetchMakes called");
    const response = await axiosInstance.get(API_BASE + "/makes");
    return response.data;
};

export const fetchModels = async(make) => {
    console.log("fetchModels called");
    const response = await axiosInstance.get(API_BASE + "/models", {
        params: {make}
    });
    return response.data;
};

export const fetchTypes = async(vehicleModel) => {
    console.log("fetchTypes called");
    const response = await axiosInstance.get(API_BASE + "/types", {
        params: {vehicleModel}
    });
    return response.data;
};

export const fetchEngines = async(vehicleType) => {
    console.log("fetchEngines called");
    const response = await axiosInstance.get(API_BASE + "/engines", {
        params: {vehicleType}
    });
    return response.data;
};