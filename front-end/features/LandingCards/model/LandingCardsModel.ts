import { BellOff, MessageCircle, Users } from "lucide-react";

export const cards = [
    {
        title: "Frontend Modern",
        text: "Next.js 16, React 19, TypeScript. Быстрый, типобезопасный, с отличной DX.",
        icon: MessageCircle,
        tone: "bg-primary/10 text-primary",
    },
    {
        title: "Backend Scalable",
        text: "Go с Echo фреймворком. Легкий, быстрый и хорошо справляется с нагрузкой.",
        icon: Users,
        tone: "bg-secondary/10 text-secondary",
    },
    {
        title: "Data Reliable",
        text: "PostgreSQL для стабильного хранения данных. Готово к production.",
        icon: BellOff,
        tone: "bg-accent/20 text-accent-foreground",
    },
];