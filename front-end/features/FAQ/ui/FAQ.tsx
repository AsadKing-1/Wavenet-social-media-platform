"use client";

import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
    {
        question: "Что такое WaveNet?",
        answer: "WaveNet — это экспериментальный open-source проект социальной сети. Разработан с использованием Next.js для фронтенда и Go для бэкенда. Проект направлен на создание платформы общения без инвазивного алгоритмического шума.",
    },
    {
        question: "Это рабочий проект?",
        answer: "WaveNet находится в активной разработке. Основная функциональность реализована, но проект еще нуждается в улучшениях, тестировании и дополнительных фич. Контрибьютеры приветствуются!",
    },
    {
        question: "Какой стек технологий используется?",
        answer: "Frontend: Next.js 16, React 19, TypeScript, TailwindCSS. Backend: Go с фреймворком Echo. Database: PostgreSQL. UI компоненты: shadcn/ui с Radix.",
    },
    {
        question: "Как начать работать с проектом?",
        answer: "Клонируйте репозиторий, установите зависимости (npm install для фронтенда), запустите dev-сервер (npm run dev). Подробные инструкции в README на GitHub.",
    },
    {
        question: "Можно ли вносить свой вклад?",
        answer: "Да! Проект приветствует контрибьюции. Вы можете создавать pull request'ы, сообщать об ошибках через Issues или участвовать в обсуждениях функционала.",
    },
    {
        question: "Под какой лицензией проект?",
        answer: "Лицензия указана в файле LICENSE репозитория. Уточняйте перед использованием или модификацией проекта.",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="bg-background px-4 py-16 sm:px-6">
            <div className="mx-auto max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                        Часто задаваемые вопросы
                    </h2>
                    <p className="text-muted-foreground">
                        Найдите ответы на популярные вопросы
                    </p>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.3 }}
                            transition={{ duration: 0.7, delay: index * 0.05 }}
                            className="rounded-[8px] border border-border bg-card/50 backdrop-blur-sm overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-4 hover:bg-card/80 transition-colors duration-200"
                            >
                                <h3 className="text-base font-semibold text-card-foreground text-left">
                                    {faq.question}
                                </h3>
                                <ChevronDown
                                    className={`size-5 text-muted-foreground transition-transform duration-300 ${
                                        openIndex === index ? "rotate-180" : ""
                                    }`}
                                />
                            </button>
                            {openIndex === index && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="border-t border-border px-4 py-3 bg-background/50"
                                >
                                    <p className="text-sm text-muted-foreground leading-6">
                                        {faq.answer}
                                    </p>
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
