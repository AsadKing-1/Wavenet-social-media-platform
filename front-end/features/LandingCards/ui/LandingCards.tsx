"use client";

import { motion } from "motion/react";
import { cards } from "../model/LandingCardsModel";

export default function LandingCards() {
    return (
        <section className="flex flex-col gap-5 relative z-10 bg-background px-4 pb-14 sm:px-6">
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-3xl font-bold text-foreground">
                    Технологический стек
                </h1>
                <p className="text-muted-foreground">
                    Современные инструменты для разработки
                </p>
            </div>
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-3">
                {cards.map(({ title, text, icon: Icon, tone }) => (
                    <motion.article
                        key={title}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="rounded-[8px] border border-border bg-card/80 p-4 text-left shadow-soft backdrop-blur-md hover:scale-105 transition-all duration-300 hover:shadow-none"
                    >
                        <div className={`mb-4 flex size-9 items-center justify-center rounded-[8px] ${tone}`}>
                            <Icon className="size-5" strokeWidth={1.8} />
                        </div>
                        <h2 className="text-base font-semibold text-card-foreground">{title}</h2>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
                    </motion.article>
                ))}
            </div>
        </section>
    );
}
