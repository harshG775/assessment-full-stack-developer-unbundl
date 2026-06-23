import { createFileRoute } from "@tanstack/react-router"
import FaqsSection from "../components/sections/faqs-section"
import WhyWhistleSection from "#/components/sections/why-whistle-section"
import ComparisonSection from "#/components/sections/comparison-section"

export const Route = createFileRoute("/")({ component: Home })

function Home() {
    return (
        <div>
            <main>
                <WhyWhistleSection />
                <ComparisonSection />
                <FaqsSection />
            </main>
        </div>
    )
}
