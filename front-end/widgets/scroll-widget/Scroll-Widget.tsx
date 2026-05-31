export default function ScrollWidget() {
    return (
        <div className="scroll-icon flex flex-col items-center gap-1 text-zinc-400 mt-5">
            <span className="uppercase tracking-[0.25em] text-sm">
                Scroll Down
            </span>

            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"
                />
            </svg>
        </div>
    );
}