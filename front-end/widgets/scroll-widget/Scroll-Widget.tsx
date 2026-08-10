import { ArrowDown } from "lucide-react";

export default function ScrollWidget() {
    return (
        <div className="scroll-icon mt-10 flex flex-col items-center gap-1 text-muted-foreground">
            <span className="text-xs font-medium uppercase tracking-[0.25em]">
                Ниже
            </span>
            <ArrowDown className="size-6" strokeWidth={1.6} />
        </div>
    );
}
