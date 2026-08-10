import { z } from "zod";

export const RegisterSchema = z.object({
    name: z.string().min(3, { message: "Имя должно содержать не менее 3 символов" }),
    email: z.string().email({ message: "Пожалуйста, введите действительный email" }),
    password: z.string().min(6, { message: "Пароль должен содержать не менее 6 символов" }),
})