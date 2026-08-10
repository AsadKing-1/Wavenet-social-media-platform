import axios from "axios";
const API_BASE_URL = "http://127.0.0.1:8000/api";

export const userAPI = {
    getAll: async () => {
        const res = await axios.get(`${API_BASE_URL}/users`);
        return res.data;
    },
    create: async (userData: { name: string; email: string; password: string }) => {
        const res = await axios.post(`${API_BASE_URL}/users`, userData);
        return res.data;
    },
    getById: async (id: string) => {
        const res = await axios.get(`${API_BASE_URL}/users/${id}`);
        return res.data;
    },
    login: async (credentials: { email: string; password: string }) => {
        const res = await axios.post(`${API_BASE_URL}/login`, credentials);
        return res.data;
    },
}