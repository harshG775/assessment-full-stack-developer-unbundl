import { createFileRoute } from "@tanstack/react-router"

export interface Faq {
    id: string
    question: string
    answer: string
}

const faqs: Faq[] = [
    {
        id: "faq-1",
        question: "What are Aligners?",
        answer: "Aligners are custom-made, clear, removable trays that gradually move your teeth into the desired position. They are a discreet alternative to traditional metal braces and are designed using a 3D scan of your teeth for a precise, comfortable fit.",
    },
    {
        id: "faq-2",
        question: "How do Aligners work?",
        answer: "Each aligner applies gentle, controlled pressure to specific teeth. You switch to a new set every 10 days, with each set moving your teeth slightly closer to their final position, as planned by your orthodontist using AI-assisted 3D modeling.",
    },
    {
        id: "faq-3",
        question: "Can any dentist do irregular teeth treatment?",
        answer: "Not every dentist is trained in clear aligner therapy for complex cases. Whistle partners exclusively with experienced orthodontists at House of Clove, who specialize in treating both mild and complex misalignments.",
    },
    {
        id: "faq-4",
        question: "Are there any restriction on eating or drinking?",
        answer: "You should remove your aligners before eating or drinking anything other than water, and brush your teeth before putting them back in. This prevents staining and damage to the aligners and keeps your teeth clean during treatment.",
    },
    {
        id: "faq-5",
        question: "How long does the treatment take?",
        answer: "Typically, it may take 6-12 months for results to appear, but this varies based on the complexity of your case. Treatment duration can range from 8-24 months or slightly more, so it's best to consult your orthodontist for a personalized timeline.",
    },
]

export const Route = createFileRoute("/api/v1/faqs")({
    server: {
        handlers: {
            GET: async ({ request: _ }) => {
                return Response.json(
                    { faqs },
                    {
                        status: 200,
                        headers: {
                            "Cache-Control": "no-store, no-cache, must-revalidate",
                        },
                    },
                )
            },
        },
    },
})