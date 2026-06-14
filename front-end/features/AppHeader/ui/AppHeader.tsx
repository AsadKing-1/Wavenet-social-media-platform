import Image from "next/image";
import Logo from "@/images/logo.png"
import Link from "next/link";

export default function AppHeader() {
    return (
        <header className="w-full bg-white shadow-lg p-4">
            <div className="flex justify-between items-center max-w-6xl mx-auto ">
                <div className="flex items-center gap-3">
                    <Image className="w-10 h-10 sm:w-12 sm:h-12" loading="eager" src={Logo} alt="Logo" />
                    <h1 className="text-xl sm:text-2xl font-bold text-foreground">WaveNet</h1>
                </div>
                <div>
                    <Link href="/dashboard" className="text-sm sm:text-base text-foreground hover:text-primary transition-colors">Dashboard</Link>
                    <Link href="/profile" className="ml-4 text-sm sm:text-base text-foreground hover:text-primary transition-colors">Profile</Link>
                    <Link href="/settings" className="ml-4 text-sm sm:text-base text-foreground hover:text-primary transition-colors">Settings</Link>
                    <Link href="/messages" className="ml-4 text-sm sm:text-base text-foreground hover:text-primary transition-colors">Messages</Link>
                    <Link href="/explore" className="ml-4 text-sm sm:text-base text-foreground hover:text-primary transition-colors">Explore</Link>
                </div>
            </div>
        </header>
    )
}