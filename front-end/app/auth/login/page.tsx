"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { motion } from "motion/react";
import Image from "next/image";
import Logo from "@/images/logo.png";
import { userAPI } from "@/lib/api/userAPI";
import { getErrorMessage } from "@/lib/api/errors";
import { setAuthToken } from "@/lib/authToken";
import { LoginSchema } from "@/lib/validations/login.schema";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { getSafeRedirect } from "@/lib/safeRedirect";

interface LoginFormData {
    email: string;
    password: string;
}

function getSafeNextPath() {
    const nextPath = new URLSearchParams(window.location.search).get("next");
    return getSafeRedirect(nextPath, "/dashboard");
}

export default function LoginPage() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(LoginSchema)
    })
    const [loginError, setLoginError] = useState<string | null>(null);

    const onSubmit = async (data: LoginFormData) => {
        try {
            setLoginError(null);
            const result = await userAPI.login(data);
            
            if (result.token) {
                setAuthToken(result.token);
                window.location.assign(getSafeNextPath());
            } else {
                setLoginError("Сервер не вернул токен");
            }
        } catch (error: unknown) {
            const message = getErrorMessage(error, "Ошибка входа");
            setLoginError(message);
            console.error("Error logging in:", error);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative min-h-screen flex flex-col items-center justify-center bg-background overflow-hidden px-4 sm:px-6 md:px-10 py-6 sm:py-10"
        >
            <Image
                aria-hidden
                alt="WaveNet Logo"
                loading="eager"
                className="pointer-events-none absolute left-1/2 top-1/2 w-[min(60vw,500px)] -translate-x-1/2 -translate-y-1/2 opacity-[0.06]"
                src={Logo}
            />
            
            <div className="absolute top-0 right-0 w-32 h-32 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-secondary/5 rounded-full blur-3xl -z-10" />

            <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full max-w-sm"
            >
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-center mb-8"
                >
                    <div className="flex items-center justify-center mb-4">
                        <Image
                            src={Logo}
                            alt="WaveNet"
                            width={48}
                            height={48}
                            className="opacity-80"
                        />
                    </div>
                    <h1 className="text-2xl font-bold text-foreground mb-1">WaveNet</h1>
                    <p className="text-sm text-muted-foreground">
                        Добро пожаловать в социальную сеть
                    </p>
                </motion.div>

                <Card className="w-full shadow-soft border-primary/10">
                    <CardHeader>
                        <CardTitle className="text-xl">Войти в аккаунт</CardTitle>
                        <CardDescription>
                            Введите свой email для входа
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            {loginError && (
                                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-500">
                                    {loginError}
                                </div>
                            )}
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-sm font-medium">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    className="border-primary/20 focus:border-primary/50"
                                    {...register("email")}
                                />
                                {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-sm font-medium">
                                        Пароль
                                    </Label>
                                    <Link
                                        href="#"
                                        className="text-xs text-primary hover:text-primary/80 underline-offset-2 hover:underline"
                                    >
                                        Забыли пароль?
                                    </Link>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="border-primary/20 focus:border-primary/50"
                                    {...register("password")}
                                />
                                {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
                            </div>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 rounded-lg transition-all duration-300 shadow-soft hover:shadow-none disabled:opacity-50"
                            >
                                {isSubmitting ? "Загрузка..." : "Войти"}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex-col gap-3 bg-surface-container/30 py-5">
                        <Button
                            variant="outline"
                            className="w-full border-primary/30 hover:bg-primary/5 text-foreground font-medium py-2"
                        >
                            Войти с Google
                        </Button>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-primary/10" />
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="px-2 bg-card text-muted-foreground">
                                    Или продолжить с
                                </span>
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            className="w-full border-primary/30 hover:bg-primary/5 text-foreground font-medium py-2"
                        >
                            GitHub
                        </Button>
                    </CardFooter>
                </Card>

                {/* Footer Link */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-center text-xs text-muted-foreground mt-6"
                >
                    Нет аккаунта?{" "}
                    <Link href="/auth/register" className="text-primary font-medium hover:underline">
                        Зарегистрироваться
                    </Link>
                </motion.p>
            </motion.div>
        </motion.div>
    )
}
