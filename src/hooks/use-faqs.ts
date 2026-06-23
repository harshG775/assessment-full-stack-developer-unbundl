import { useEffect, useState } from "react"
import { api, ApiError } from "#/lib/api"
import type { Faq, FaqsResponse } from "#/types/faqs.type"

interface UseFaqsResult {
    faqs: Faq[]
    isLoading: boolean
    error: string | null
}

export function useFaqs(): UseFaqsResult {
    const [faqs, setFaqs] = useState<Faq[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let isMounted = true

        async function fetchFaqs() {
            setIsLoading(true)
            setError(null)

            try {
                const data = await api.get<FaqsResponse>("/api/v1/faqs")

                if (isMounted) {
                    setFaqs(data.faqs)
                }
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof ApiError ? err.message : "Something went wrong while loading FAQs.")
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false)
                }
            }
        }

        fetchFaqs()

        return () => {
            isMounted = false
        }
    }, [])

    return { faqs, isLoading, error }
}
