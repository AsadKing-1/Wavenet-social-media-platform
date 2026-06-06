import Image from "next/image";
import Logo from "@/images/logo.png";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingHeader() {
    return(
        <header className="w-full sticky top-0 z-100 border-b border-border bg-background/85 px-4 py-3 shadow-soft backdrop-blur-md sm:px-6">
            <div className="max-w-6xl mx-auto flex justify-between items-center gap-3 ">
                <div className="flex items-center gap-3">
                    <Image className="w-10 h-10 sm:w-12 sm:h-12" loading="eager" src={Logo} alt="Logo" />
                    <h1 className="text-xl sm:text-2xl font-bold text-foreground">WaveNet</h1>
                </div>
                <div>
                    <Button asChild>
                        <Link href="/auth/register">Регистрация</Link>
                    </Button>
                </div>
            </div>
        </header>
    )
}
