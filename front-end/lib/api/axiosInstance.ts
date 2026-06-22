import axios from "axios";
import { clearAuthToken } from "../authToken";

export const axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
});

axiosInstance.interceptors.request.use((config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => {
        // Если бэкенд возвращает конверт с полем statusCode, распаковываем его
        if (response.data && typeof response.data === "object" && "statusCode" in response.data) {
            const { statusCode, data, message } = response.data;
            if (statusCode >= 400) {
                return Promise.reject({
                    response: {
                        data: { message: message || "Произошла ошибка при запросе" },
                        status: statusCode,
                    },
                });
            }
            // Заменяем тело ответа на чистые данные
            response.data = data;
        }
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            clearAuthToken();
        }
        return Promise.reject(error);
    }
);