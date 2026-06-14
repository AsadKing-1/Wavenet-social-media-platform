import LandingHeader from "@/features/LandingHeader/ui/LandingHeader"
export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return(
        <main>
            <LandingHeader/>
            {children}
        </main>
    )
}