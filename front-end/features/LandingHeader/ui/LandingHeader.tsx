"use client";

import Image from "next/image";
import Logo from "@/images/logo.png";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingHeader() {
    return (
        <header className="w-full sticky top-0 z-50 border-b border-primary/10 bg-background/80 backdrop-blur-md px-4 py-3 shadow-soft sm:px-6">
            <div className="max-w-6xl mx-auto flex justify-between items-center gap-4">
                <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
                    <Image className="w-9 h-9 sm:w-10 sm:h-10" loading="eager" src={Logo} alt="Logo" />
                    <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-primary/75 bg-clip-text text-transparent">
                        WaveNet
                    </h1>
                </Link>
                
                <div className="flex items-center gap-3">
                    <Button asChild variant="ghost" className="text-sm font-medium hover:bg-primary/5 rounded-lg">
                        <Link href="/auth/login">Войти</Link>
                    </Button>
                    <Button asChild className="text-sm font-medium rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-soft hover:shadow-none transition-all duration-300">
                        <Link href="/auth/register">Регистрация</Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}
