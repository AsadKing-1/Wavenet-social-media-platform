"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/images/logo.png";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-card/30 border-t border-border px-4 py-12 sm:px-6">
            <div className="mx-auto max-w-6xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <Image className="w-8 h-8" src={Logo} alt="Logo" />
                            <h3 className="text-lg font-bold text-foreground">WaveNet</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Open-source проект социальной сети на Next.js и Go
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                    >
                        <h4 className="font-semibold text-foreground mb-4">Ссылки</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="https://github.com/AsadKing-1/Wavenet-social-media-platform" target="_blank" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    GitHub репозиторий
                                </Link>
                            </li>
                            <li>
                                <Link href="https://github.com/AsadKing-1/Wavenet-social-media-platform" target="_blank" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    Issues
                                </Link>
                            </li>
                            <li>
                                <Link href="https://github.com/AsadKing-1/Wavenet-social-media-platform/discussions" target="_blank" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    Discussions
                                </Link>
                            </li>
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <h4 className="font-semibold text-foreground mb-4">Стек</h4>
                        <ul className="space-y-2">
                            <li className="text-sm text-muted-foreground">
                                Frontend: Next.js, React, TypeScript
                            </li>
                            <li className="text-sm text-muted-foreground">
                                Backend: Go, Echo
                            </li>
                            <li className="text-sm text-muted-foreground">
                                Database: PostgreSQL
                            </li>
                        </ul>
                    </motion.div>
                </div>

                {/* Bottom */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
                >
                    <p className="text-sm text-muted-foreground">
                        © {currentYear} WaveNet. Open source проект на GitHub.
                    </p>
                    <div className="flex gap-4">

                        <Link href="https://github.com/AsadKing-1/Wavenet-social-media-platform" target="_blank" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                            GitHub
                        </Link>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
