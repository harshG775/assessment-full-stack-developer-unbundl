import { useFaqs } from "#/hooks/use-faqs"

export default function FaqsSection() {
    const { faqs, isLoading, error } = useFaqs()

    if (isLoading) {
        return (
            <div>
                <h2>FAQ</h2>
                <p>Loading FAQs...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div>
                <h2>FAQ</h2>
                <p>Couldn't load FAQs right now. Please try again later.</p>
            </div>
        )
    }

    return (
        <div>
            <h2>FAQ</h2>
            <ul>
                {faqs.map((faq) => (
                    <li key={faq.id}>{faq.question}</li>
                ))}
            </ul>
        </div>
    )
}
