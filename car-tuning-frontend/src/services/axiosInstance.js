import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if(accessToken){
            config.headers.Authorization = "Bearer" + accessToken;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async(error) => {
        const originalRequest = error.config;
        if(error.response.status === 401 &&  !originalRequest._retry){
            originalRequest._retry = true;
            try{
                const res = await axiosInstance.post("/auth/refresh");
                const newAccessToken = res.data.accessToken;
                localStorage.setItem("accessToken", newAccessToken);
                originalRequest.headers.Authorization = "Bearer" + accessToken;
                return axiosInstance(originalRequest);
            }catch(_error){
                Promise.reject(error);
            }
        }
        Promise.reject(error);
    }
);

export default axiosInstance;