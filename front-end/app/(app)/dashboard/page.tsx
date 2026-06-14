"use client";

import { useEffect, useState } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";
import { userAPI } from "@/lib/api/userAPI";

type User = {
    name: string;
    email: string;
    password?: string;
};

export default function DashboardPage() {
    const { isAuthenticated, logout } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!isAuthenticated) return;

        const fetchUsers = async () => {
            try {
                const data = await userAPI.getAll();
                setUsers(data);
            } catch (err: unknown) {
                const message = err instanceof Error ? err.message : "Неизвестная ошибка";
                setError(message);
                console.error("Error fetching users:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [isAuthenticated]);

    return (
        <ProtectedRoute>
            <div>
                <h1>Панель управления</h1>
            </div>
        </ProtectedRoute>
    );
}
