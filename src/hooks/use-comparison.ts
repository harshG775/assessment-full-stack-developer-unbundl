import { useEffect, useState } from "react"
import { api, ApiError } from "#/lib/api"
import type { ComparisonResponse, ComparisonRow } from "#/types/comparison.type"

function getComparison() {
    return api.get<ComparisonResponse>("/api/v1/comparison")
}

interface UseComparisonResult {
    rows: ComparisonRow[]
    isLoading: boolean
    error: string | null
}

export function useComparison(): UseComparisonResult {
    const [rows, setRows] = useState<ComparisonRow[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let isMounted = true

        async function fetchComparison() {
            setIsLoading(true)
            setError(null)

            try {
                const data = await getComparison()

                if (isMounted) {
                    setRows(data.rows)
                }
            } catch (err) {
                if (isMounted) {
                    setError(
                        err instanceof ApiError ? err.message : "Something went wrong while loading the comparison.",
                    )
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false)
                }
            }
        }

        fetchComparison()

        return () => {
            isMounted = false
        }
    }, [])

    return { rows, isLoading, error }
}
