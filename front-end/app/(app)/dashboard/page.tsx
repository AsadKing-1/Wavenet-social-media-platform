
"use client";

import { useEffect, useState } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";
import { getAuthToken } from "@/lib/authToken";

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
                const token = getAuthToken();
                const res = await fetch("http://127.0.0.1:8000/api/users", {
                    cache: "no-store",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    throw new Error("Ошибка при загрузке пользователей");
                }

                const data = await res.json();
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
            <div className="min-h-screen bg-background p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
                        <button
                            onClick={logout}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                        >
                            Выход
                        </button>
                    </div>

                    {loading && <p className="text-lg">Загрузка пользователей...</p>}
                    {error && <p className="text-lg text-red-500">{error}</p>}

                    {!loading && !error && users.length === 0 && (
                        <p className="text-lg text-muted-foreground">Пользователей не найдено</p>
                    )}

                    {!loading && users.length > 0 && (
                        <div className="grid gap-4">
                            {users.map((user) => (
                                <div
                                    key={user.email}
                                    className="bg-card border border-border rounded-lg p-4 shadow"
                                >
                                    <h2 className="text-xl font-semibold text-foreground">{user.name}</h2>
                                    <p className="text-muted-foreground">{user.email}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </ProtectedRoute>
    );
}
