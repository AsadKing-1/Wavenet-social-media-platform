import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email({ message: "Пожалуйста, введите действительный email" }),
    password: z.string().min(6, { message: "Пароль должен содержать не менее 6 символов" }),
})