import { useState } from "react"
import { Plus } from "lucide-react"
import { useFaqs } from "#/hooks/use-faqs"
import styles from "./faqs-section.module.css"

export default function FaqsSection() {
    const { faqs, isLoading, error } = useFaqs()
    const [openId, setOpenId] = useState<string | null>(null)

    function handleToggle(id: string) {
        setOpenId((current) => (current === id ? null : id))
    }

    return (
        <section className={styles.section}>
            <div className="container">
                <h2 className={styles.heading}>
                    <span className={styles.headingAccent}>Got Questions?</span>{" "}
                    <span className={styles.headingMain}>We&apos;ve got answers</span>
                </h2>

                {isLoading && <p className={styles.status}>Loading FAQs...</p>}

                {error && (
                    <p className={styles.status} role="alert">
                        Couldn&apos;t load FAQs right now. Please try again later.
                    </p>
                )}

                {!isLoading && !error && (
                    <ul className={styles.list}>
                        {faqs.map((faq) => {
                            const isOpen = openId === faq.id
                            const answerId = `faq-answer-${faq.id}`
                            const questionId = `faq-question-${faq.id}`

                            return (
                                <li key={faq.id} className={styles.item}>
                                    <button
                                        type="button"
                                        id={questionId}
                                        className={styles.trigger}
                                        aria-expanded={isOpen}
                                        aria-controls={answerId}
                                        onClick={() => handleToggle(faq.id)}
                                    >
                                        <span className={styles.question}>{faq.question}</span>
                                        <Plus
                                            className={styles.icon}
                                            data-open={isOpen}
                                            aria-hidden="true"
                                            size={20}
                                        />
                                    </button>

                                    <div
                                        id={answerId}
                                        role="region"
                                        aria-labelledby={questionId}
                                        className={styles.answerWrapper}
                                        data-open={isOpen}
                                    >
                                        <div className={styles.answerInner}>
                                            <p className={styles.answer}>{faq.answer}</p>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                )}
            </div>
        </section>
    )
}