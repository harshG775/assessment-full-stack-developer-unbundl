import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/api/v1/health")({
    server: {
        handlers: {
            GET: async ({ request: _ }) => {
                const healthData = {
                    status: "healthy",
                    timestamp: new Date().toISOString(),
                    uptime: process.uptime(),
                    environment: process.env.NODE_ENV || "development",
                }

                return Response.json(healthData, {
                    status: 200,
                    headers: {
                        "Cache-Control": "no-store, no-cache, must-revalidate",
                    },
                })
            },
        },
    },
})
