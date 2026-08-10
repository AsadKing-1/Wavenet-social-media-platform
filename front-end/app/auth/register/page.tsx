"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { motion } from "motion/react";
import Image from "next/image";
import Logo from "@/images/logo.png";

import { RegisterFormData } from "@/types/global.types";
import { userAPI } from "@/lib/api/userAPI";
import { getErrorMessage } from "@/lib/api/errors";
import { setAuthToken } from "@/lib/authToken";
import { RegisterSchema } from "@/lib/validations/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {

    const router = useRouter();
    const [registerError, setRegisterError] = useState<string | null>(null);
    const [registerSuccess, setRegisterSuccess] = useState(false);

    const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm({
        resolver: zodResolver(RegisterSchema)
    })

    const onSubmit = async (data: RegisterFormData) => {
        try {
            setRegisterError(null);
            await userAPI.create(data);
            
            // После регистрации пытаемся залогиниться автоматически
            try {
                const loginResult = await userAPI.login({
                    email: data.email,
                    password: data.password
                });
                
                if (loginResult.token) {
                    setAuthToken(loginResult.token);
                    setRegisterSuccess(true);
                    setTimeout(() => {
                        window.location.assign("/dashboard");
                    }, 500);
                }
            } catch {
                // Если автологин не сработал, редиректим на логин страницу
                setRegisterSuccess(true);
                setTimeout(() => {
                    router.push("/auth/login");
                }, 1000);
            }
        } catch (error: unknown) {
            const message = getErrorMessage(error, "Ошибка при регистрации");
            setRegisterError(message);
            console.error("Error creating user:", error);
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
                        <CardTitle className="text-xl">Зарегистрироваться</CardTitle>
                        <CardDescription>
                            Введите свои данные для регистрации
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            {registerError && (
                                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-500">
                                    {registerError}
                                </div>
                            )}
                            {registerSuccess && (
                                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-sm text-green-500">
                                    ✓ Регистрация успешна! Перенаправление...
                                </div>
                            )}
                            <div>
                                <Label htmlFor="name" className="text-sm font-medium">
                                    Имя
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Введите ваше имя"
                                    className="border-primary/20 focus:border-primary/50"
                                    {...register("name")}
                                />
                                {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                            </div>
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
                                disabled={isSubmitting || registerSuccess}
                                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 rounded-lg transition-all duration-300 shadow-soft hover:shadow-none disabled:opacity-50"
                            >
                                {isSubmitting ? "Регистрация..." : registerSuccess ? "Успешно!" : "Зарегистрироваться"}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex-col gap-3 bg-surface-container/30 py-5">
                        <Button
                            variant="outline"
                            className="w-full border-primary/30 hover:bg-primary/5 text-foreground font-medium py-2"
                        >
                            Зарегистрироваться с Google
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
                    Нажимая &quot;Зарегистрироваться&quot;, вы соглашаетесь с нашими{" "}
                    <Link href="#" className="text-primary hover:underline">
                        Условиями использования
                    </Link>
                </motion.p>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-center text-sm text-muted-foreground mt-4"
                >
                    Уже есть аккаунт?{" "}
                    <Link href="/auth/login" className="text-primary font-medium hover:underline">
                        Войти
                    </Link>
                </motion.p>
            </motion.div>
        </motion.div>
    )
}
