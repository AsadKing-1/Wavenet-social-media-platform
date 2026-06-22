"use client";

import Image from "next/image";
import Logo from "@/images/logo.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export default function AppHeader() {
    const pathname = usePathname();
    const { logout } = useAuth();

    const navItems = [
        { name: "Панель", href: "/dashboard" },
        { name: "Профиль", href: "/profile" },
        { name: "Сообщения", href: "/messages" },
        { name: "Обзор", href: "/explore" },
        { name: "Настройки", href: "/settings" },
    ];

    return (
        <header className="w-full sticky top-0 z-50 border-b border-primary/10 bg-background/80 backdrop-blur-md px-4 py-3 shadow-soft sm:px-6">
            <div className="max-w-6xl mx-auto flex justify-between items-center gap-4">
                <Link href="/dashboard" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
                    <Image className="w-9 h-9 sm:w-10 sm:h-10" loading="eager" src={Logo} alt="Logo" />
                    <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-primary/75 bg-clip-text text-transparent">
                        WaveNet
                    </h1>
                </Link>
                
                <nav className="hidden md:flex items-center gap-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200",
                                    isActive 
                                        ? "text-primary" 
                                        : "text-muted-foreground hover:text-foreground hover:bg-primary/5"
                                )}
                            >
                                {item.name}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeNavIndicator"
                                        className="absolute bottom-0 left-2 right-2 h-[2px] bg-primary rounded-full"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="flex items-center gap-3">
                    <Button 
                        onClick={logout}
                        variant="ghost" 
                        size="sm"
                        className="text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-all duration-200 font-medium rounded-lg"
                    >
                        Выйти
                    </Button>
                </div>
            </div>
            
            {/* Mobile nav for small screens */}
            <div className="flex md:hidden justify-around items-center border-t border-primary/5 mt-2 pt-2 gap-1 overflow-x-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-200 whitespace-nowrap",
                                isActive 
                                    ? "text-primary bg-primary/5 font-semibold" 
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {item.name}
                        </Link>
                    );
                })}
            </div>
        </header>
    );
}