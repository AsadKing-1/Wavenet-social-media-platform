import Link from "next/link";
import ScrollWidget from "@/widgets/scroll-widget/Scroll-Widget";

export default function LandingHero() {
    return (
        <section className="flex flex-col items-center justify-center gap-4 h-150 px-4 py-10 text-center relative overflow-hidden sm:px-0">
            <div className="text-[12px] bg-primary/20 text-primary border border-primary px-4 py-1 rounded-4xl font-semibold">Представляем WaveNet</div>
            <div className="flex flex-col gap-6 max-w-3xl">
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold">Связь без шума.</h1>
                <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
                    Спокойная, фокусированная сеть, созданная для значимых взаимодействий. Отойдите от алгоритмических лент и вовлекайтесь в общение высокой точности.
                </p>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Link href="/register" className="w-full sm:w-auto bg-primary px-6 py-3 text-white rounded-4xl shadow-lg transition-all duration-300 hover:shadow-none hover:bg-primary/80">
                        Присоединиться
                    </Link>
                    <Link href="/login" className="w-full sm:w-auto bg-secondary px-6 py-3 text-white rounded-4xl shadow-lg transition-all duration-300 hover:shadow-none hover:bg-secondary/80">
                        Узнать больше
                    </Link>
                </div>
                <ScrollWidget />
            </div>
        </section>
    )
}