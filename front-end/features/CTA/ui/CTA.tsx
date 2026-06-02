"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CTA() {
    return (
        <section className="bg-background px-4 py-16 sm:px-6">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.7 }}
                className="mx-auto max-w-4xl rounded-[12px] border border-border bg-linear-to-r from-primary/10 via-background to-primary/5 p-8 sm:p-12 text-center backdrop-blur-sm"
            >
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                    Это open-source проект
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                    WaveNet — это экспериментальный проект социальной сети на GitHub. Мы приглашаем разработчиков изучить код, вносить улучшения и участвовать в развитии.
                </p>
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <Button asChild size="lg">
                        <Link href="https://github.com/IGMA-IGMA/WaveNet-socialmedia" target="_blank" className="flex items-center gap-2">
                            GitHub репозиторий
                            <ArrowRight size={18} />
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                        <Link href="https://github.com/IGMA-IGMA/WaveNet-socialmedia" target="_blank">
                            Смотреть на GitHub
                        </Link>
                    </Button>
                </motion.div>
            </motion.div>
        </section>
    );
}
