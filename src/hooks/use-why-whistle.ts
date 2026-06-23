import { useEffect, useState } from "react"
import { api, ApiError } from "#/lib/api"
import type { Feature, FeaturesResponse } from "#/types/why-whistle.type"

function getFeatures() {
    return api.get<FeaturesResponse>("/api/v1/why-whistle")
}

interface UseWhyWhistleResult {
    features: Feature[]
    isLoading: boolean
    error: string | null
}

export function useWhyWhistle(): UseWhyWhistleResult {
    const [features, setFeatures] = useState<Feature[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let isMounted = true

        async function fetchFeatures() {
            setIsLoading(true)
            setError(null)

            try {
                const data = await getFeatures()

                if (isMounted) {
                    setFeatures(data.features)
                }
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof ApiError ? err.message : "Something went wrong while loading features.")
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false)
                }
            }
        }

        fetchFeatures()

        return () => {
            isMounted = false
        }
    }, [])

    return { features, isLoading, error }
}
