import LandingHeader from "@/features/LandingHeader/ui/LandingHeader"
export default function LandingLayout({ children }: { children: React.ReactNode }) {
    return (
        <main>
            <LandingHeader/>
            {children}
        </main>
    )
}