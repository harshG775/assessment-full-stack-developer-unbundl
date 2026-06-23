import { createFileRoute } from "@tanstack/react-router"
import type { ComparisonRow } from "#/types/comparison.type"

const rows: ComparisonRow[] = [
    {
        id: "row-1",
        feature: "Easy to complex cases",
        detail: "Whistle treats both mild misalignments and complex cases requiring advanced planning, while most other brands only accept mild to moderate cases.",
        whistle: { status: "yes", label: "Yes, mild to complex" },
        otherBrands: { status: "no", label: "No, only mild to moderate" },
    },
    {
        id: "row-2",
        feature: "Clear-cut Pricing",
        detail: "Whistle shares the full cost breakdown upfront, with no hidden charges added later in your treatment.",
        whistle: { status: "yes", label: "Transparent" },
        otherBrands: { status: "no", label: "Hidden costs" },
    },
    {
        id: "row-3",
        feature: "Aligner Change",
        detail: "Faster aligner changes mean your teeth move into position sooner, shortening overall treatment time.",
        whistle: { status: "yes", label: "Every 10 days" },
        otherBrands: { status: "no", label: "Every 2 weeks" },
    },
    {
        id: "row-4",
        feature: "Clinical Partnership",
        detail: "Every Whistle treatment is overseen by orthodontists at House of Clove — not a remote, unaffiliated dentist network.",
        whistle: { status: "yes", label: "House of Clove" },
        otherBrands: { status: "no", label: "Unverified network" },
    },
    {
        id: "row-5",
        feature: "Movement Between Cities",
        detail: "With 450+ clinics nationwide, you can continue check-ups at any partner clinic if you relocate mid-treatment.",
        whistle: { status: "yes", label: "450+ clinics" },
        otherBrands: { status: "no", label: "Limited locations" },
    },
    {
        id: "row-6",
        feature: "Complimentary Teeth Scaling",
        detail: "A full scaling and polish is included at no extra cost as part of your treatment plan.",
        whistle: { status: "yes", label: "Included" },
        otherBrands: { status: "no", label: "Charged separately" },
    },
]

export const Route = createFileRoute("/api/v1/comparison")({
    server: {
        handlers: {
            GET: async ({ request: _ }) => {
                return Response.json(
                    { rows },
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