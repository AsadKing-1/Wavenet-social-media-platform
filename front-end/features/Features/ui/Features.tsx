"use client";

import { motion } from "motion/react";
import { Zap, Shield, Users, Cpu } from "lucide-react";

const features = [
    {
        icon: Zap,
        title: "Современный стек",
        description: "Next.js 16, React 19, TypeScript - последние версии популярных технологий",
        tone: "bg-blue-500/10 text-blue-500",
    },
    {
        icon: Shield,
        title: "Open Source",
        description: "Весь код открыт на GitHub. Вносите свой вклад и улучшайте проект",
        tone: "bg-green-500/10 text-green-500",
    },
    {
        icon: Users,
        title: "Полный стек",
        description: "Frontend на Next.js, Backend на Go, Database - PostgreSQL",
        tone: "bg-purple-500/10 text-purple-500",
    },
    {
        icon: Cpu,
        title: "Production-ready",
        description: "Учится на лучших практиках. Готов к экспериментам и доработке",
        tone: "bg-orange-500/10 text-orange-500",
    },
];

export default function Features() {
    return (
        <section className="bg-background px-4 py-16 sm:px-6">
            <div className="mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                        Мощные возможности
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Все что нужно для комфортного общения в одном месте
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {features.map(({ icon: Icon, title, description, tone }, index) => (
                        <motion.div
                            key={title}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.3 }}
                            transition={{ duration: 0.7, delay: index * 0.1 }}
                            className="rounded-[8px] border border-border bg-card/50 p-6 backdrop-blur-sm hover:bg-card/80 transition-all duration-300"
                        >
                            <div className={`mb-4 flex size-10 items-center justify-center rounded-[8px] ${tone}`}>
                                <Icon className="size-5" strokeWidth={2} />
                            </div>
                            <h3 className="text-base font-semibold text-card-foreground mb-2">
                                {title}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-5">
                                {description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
