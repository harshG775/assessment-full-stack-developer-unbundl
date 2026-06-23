import { createFileRoute } from "@tanstack/react-router"
import type { Feature } from "#/types/why-whistle.type"

const features: Feature[] = [
    {
        id: "feature-1",
        title: "Custom-made & invisible",
        description: "Tailored for your teeth and smile with a clear, discreet appearance.",
        imageUrl: "https://picsum.photos/seed/whistle-custom/400/300",
    },
    {
        id: "feature-2",
        title: "Predictable results",
        description: "Advanced 3D modeling and AI technology for precise planning and predictable results.",
        imageUrl: "https://picsum.photos/seed/whistle-predictable/400/300",
    },
    {
        id: "feature-3",
        title: "Partnership with Clove Dental",
        description:
            "Led by highly experienced Orthodontists of House of Clove. Whistle has connected over 2 lakh smiles.",
        imageUrl: "https://picsum.photos/seed/whistle-partnership/400/300",
    },
    {
        id: "feature-4",
        title: "Unlimited Aligners*",
        description: "Unlimited aligners and doctor consults at no extra cost.",
        imageUrl: "https://picsum.photos/seed/whistle-unlimited/400/300",
    },
]

export const Route = createFileRoute("/api/v1/why-whistle")({
    server: {
        handlers: {
            GET: async ({ request: _ }) => {
                return Response.json(
                    { features },
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
