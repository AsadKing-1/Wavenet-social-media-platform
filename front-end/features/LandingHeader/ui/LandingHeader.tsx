import Image from "next/image";
import Logo from "@/images/logo.png";
import Link from "next/link";

export default function LandingHeader() {
    return(
        <header className="w-full sticky top-0 z-50 bg-primary-foreground shadow-sm px-4 py-3 sm:px-6">
            <div className="max-w-6xl mx-auto flex justify-between items-center gap-3 ">
                <div className="flex items-center gap-3">
                    <Image className="w-10 h-10 sm:w-12 sm:h-12" loading="eager" src={Logo} alt="Logo" />
                    <h1 className="text-xl sm:text-2xl font-bold">WaveNet</h1>
                </div>
                <div>
                    <Link className="block w-full text-center sm:inline-block bg-primary px-6 py-2 text-white rounded-4xl shadow-lg transition-all duration-300 hover:shadow-none hover:bg-primary/80" href="/register">Регистрация</Link>
                </div>
            </div>
        </header>
    )
}