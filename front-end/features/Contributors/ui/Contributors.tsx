"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

const authors = [
    {
        name: "IGMA-IGMA",
        role: "Backend & Architecture",
        description: "Разработка бэкенда на Go, database design и API",
        github: "https://github.com/IGMA-IGMA",
        color: "from-blue-500/20 to-purple-500/20",
    },
    {
        name: "AsadKing-1",
        role: "Frontend & Full Stack",
        description: "Разработка фронтенда на Next.js, архитектура приложения",
        github: "https://github.com/AsadKing-1",
        color: "from-purple-500/20 to-pink-500/20",
    },
];

export default function Contributors() {
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
                        Авторы проекта
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Разработчики, которые создали WaveNet
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {authors.map(({ name, role, description, github, color }, index) => (
                        <motion.a
                            key={name}
                            href={github}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.3 }}
                            transition={{ duration: 0.7, delay: index * 0.15 }}
                            className={`group rounded-[12px] border border-border bg-linear-to-br ${color} p-6 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-lg`}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                                        {name}
                                    </h3>
                                    <p className="text-sm text-primary font-semibold mt-1">
                                        {role}
                                    </p>
                                </div>
                                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                                    <ExternalLink size={20} />
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground leading-6">
                                {description}
                            </p>
                            <div className="mt-4 flex items-center gap-2 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                Посетить профиль →
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}
