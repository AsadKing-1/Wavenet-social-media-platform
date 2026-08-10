"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/images/logo.png";
import ScrollWidget from "@/widgets/scroll-widget/Scroll-Widget";
import { Button } from "@/components/ui/button";

export default function LandingHero() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex min-h-[calc(90svh-76px)] flex-col items-center justify-center gap-4 overflow-hidden bg-background px-4 py-10 text-center sm:px-6"
        >
            <Image
                aria-hidden
                alt=""
                className="pointer-events-none absolute left-1/2 top-1/2 w-[min(72vw,640px)] -translate-x-1/2 -translate-y-1/2 opacity-[0.08]"
                priority
                src={Logo}
            />
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.25 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative text-[12px] bg-primary/10 text-primary border border-primary/25 px-4 py-1 rounded-4xl font-semibold"
            >
                Open Source проект на GitHub
            </motion.div>
            <div className="flex flex-col gap-6 max-w-3xl">
                <motion.h1
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.25 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-4xl sm:text-5xl md:text-7xl font-bold text-foreground"
                >
                    WaveNet
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.25 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto"
                >
                    Экспериментальная социальная сеть с современным стеком: Next.js 16, Go, PostgreSQL. Исследуйте код, вносите улучшения и участвуйте в развитии.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.25 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="flex flex-col items-center justify-center gap-4 sm:flex-row"
                >
                    <Button asChild>
                        <Link href="https://github.com/IGMA-IGMA/WaveNet-socialmedia" target="_blank" className="w-full sm:w-auto bg-primary px-6 py-3 text-primary-foreground rounded-4xl shadow-soft transition-all duration-300 hover:shadow-none hover:bg-primary/90">
                            Смотреть на GitHub
                        </Link>
                    </Button>
                    <Button asChild variant="secondary">
                        <Link href="https://github.com/IGMA-IGMA/WaveNet-socialmedia#readme" target="_blank" className="w-full sm:w-auto bg-secondary px-6 py-3 text-secondary-foreground rounded-4xl shadow-soft transition-all duration-300 hover:shadow-none hover:bg-secondary/90">
                            Читать README
                        </Link>
                    </Button>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.25 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <ScrollWidget />
                </motion.div>
            </div>
        </motion.section>
    )
}
