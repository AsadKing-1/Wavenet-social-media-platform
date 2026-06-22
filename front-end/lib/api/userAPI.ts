import { axiosInstance } from "./axiosInstance";

export const userAPI = {
    getAll: async () => {
        const res = await axiosInstance.get("/users");
        return res.data;
    },
    create: async (userData: { name: string; email: string; password: string }) => {
        const res = await axiosInstance.post("/user", userData);
        return res.data;
    },
    getById: async (id: string) => {
        const res = await axiosInstance.get(`/users/${id}`);
        return res.data;
    },
    login: async (credentials: { email: string; password: string }) => {
        const res = await axiosInstance.post("/login", credentials);
        return res.data;
    },
}