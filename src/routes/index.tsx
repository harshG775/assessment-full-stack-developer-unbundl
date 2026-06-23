import { createFileRoute } from "@tanstack/react-router"
import FaqsSection from "../components/sections/faqs-section"
import WhyWhistleSection from "#/components/sections/why-whistle-section"

export const Route = createFileRoute("/")({ component: Home })

function Home() {
    return (
        <div>
            <main>
                <WhyWhistleSection />
                <FaqsSection />
            </main>
        </div>
    )
}
