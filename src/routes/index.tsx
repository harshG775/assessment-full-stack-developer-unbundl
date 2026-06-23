import { createFileRoute } from "@tanstack/react-router"
import FaqsSection from "../components/sections/faqs-section"

export const Route = createFileRoute("/")({ component: Home })

function Home() {
    return (
        <div>
            <main>
                <FaqsSection />
            </main>
        </div>
    )
}
