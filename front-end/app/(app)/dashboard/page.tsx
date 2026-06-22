"use client";

import { useEffect, useState } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";
import { userAPI } from "@/lib/api/userAPI";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

type User = {
    ID?: number;
    name: string;
    email: string;
    CreatedAt?: string;
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
                if (Array.isArray(data)) {
                    setUsers(data);
                } else {
                    setUsers([]);
                }
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
            <div className="relative min-h-screen bg-background overflow-hidden px-4 sm:px-6 md:px-10 py-10">
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
                <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-secondary/5 rounded-full blur-3xl -z-10" />

                <div className="max-w-5xl mx-auto space-y-8">
                    {/* Header */}
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-primary/10"
                    >
                        <div>
                            <h1 className="text-3xl font-extrabold text-foreground tracking-tight sm:text-4xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                                WaveNet Dashboard
                            </h1>
                            <p className="text-sm text-muted-foreground mt-1">
                                Управление пользователями и мониторинг активности сети
                            </p>
                        </div>
                        <Button 
                            onClick={logout}
                            variant="destructive"
                            className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 px-5 py-2 rounded-lg transition-all duration-300 font-medium"
                        >
                            Выйти из системы
                        </Button>
                    </motion.div>

                    {/* Content Section */}
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 space-y-4">
                            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                            <p className="text-muted-foreground animate-pulse text-sm">Загрузка пользователей...</p>
                        </div>
                    ) : error ? (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl text-center"
                        >
                            <h3 className="text-red-500 font-semibold mb-2">Не удалось загрузить данные</h3>
                            <p className="text-muted-foreground text-sm mb-4">{error}</p>
                            <Button 
                                onClick={() => window.location.reload()}
                                variant="outline"
                                className="border-primary/20 hover:bg-primary/5 text-foreground font-medium"
                            >
                                Попробовать снова
                            </Button>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-foreground">
                                    Зарегистрированные пользователи ({users.length})
                                </h2>
                            </div>

                            {users.length === 0 ? (
                                <Card className="border-dashed border-primary/20 bg-surface-container/10">
                                    <CardContent className="flex flex-col items-center justify-center py-12">
                                        <p className="text-muted-foreground text-sm">Пользователи пока не зарегистрированы.</p>
                                    </CardContent>
                                </Card>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                    {users.map((user, idx) => (
                                        <motion.div
                                            key={user.ID || idx}
                                            initial={{ opacity: 0, y: 16 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, delay: idx * 0.05 }}
                                        >
                                            <Card className="hover:shadow-md hover:border-primary/30 transition-all duration-300 border-primary/10 bg-card/60 backdrop-blur-md overflow-hidden relative group">
                                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/40 to-secondary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                <CardHeader className="pb-3">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-lg shadow-inner">
                                                            {user.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div className="overflow-hidden">
                                                            <CardTitle className="text-base truncate">{user.name}</CardTitle>
                                                            <CardDescription className="text-xs truncate">{user.email}</CardDescription>
                                                        </div>
                                                    </div>
                                                </CardHeader>
                                                <CardContent className="pt-0 pb-4 text-xs text-muted-foreground flex justify-between items-center border-t border-primary/5 mt-2 bg-surface-container/10 px-4 py-2">
                                                    <span>ID: #{user.ID}</span>
                                                    <span>
                                                        {user.CreatedAt ? new Date(user.CreatedAt).toLocaleDateString("ru-RU") : "Неизвестно"}
                                                    </span>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}
                </div>
            </div>
        </ProtectedRoute>
    );
}
