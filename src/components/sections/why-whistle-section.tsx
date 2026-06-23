import { useCallback, useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useWhyWhistle } from "#/hooks/use-why-whistle"
import Skeleton from "#/components/ui/skeleton"
import styles from "./why-whistle-section.module.css"

const FEATURE_SKELETON_COUNT = 4

function WhyWhistleSkeleton() {
    return (
        <div className={styles.track} aria-busy="true" aria-label="Loading features">
            {Array.from({ length: FEATURE_SKELETON_COUNT }).map((_, i) => (
                <div key={i} className={styles.card}>
                    <Skeleton height="160px" />
                    <Skeleton height="20px" style={{ width: "70%", marginTop: "1rem" }} />
                    <Skeleton height="14px" style={{ width: "100%", marginTop: "0.5rem" }} />
                    <Skeleton height="14px" style={{ width: "90%", marginTop: "0.25rem" }} />
                </div>
            ))}
        </div>
    )
}

export default function WhyWhistleSection() {
    const { features, isLoading, error } = useWhyWhistle()
    const trackRef = useRef<HTMLDivElement>(null)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(false)

    const updateScrollState = useCallback(() => {
        const track = trackRef.current
        if (!track) return

        const { scrollLeft, scrollWidth, clientWidth } = track
        setCanScrollLeft(scrollLeft > 4)
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4)
    }, [])

    useEffect(() => {
        updateScrollState()
    }, [features, updateScrollState])

    function handleScroll(direction: "left" | "right") {
        const track = trackRef.current
        if (!track) return

        const amount = track.clientWidth * 0.85
        track.scrollBy({
            left: direction === "left" ? -amount : amount,
            behavior: "smooth",
        })
    }

    return (
        <section className={styles.section}>
            <div className="container">
                <h2 className={styles.heading}>Why Whistle?</h2>

                {error && (
                    <p className={styles.status} role="alert">
                        Couldn&apos;t load features right now. Please try again later.
                    </p>
                )}

                {isLoading && <WhyWhistleSkeleton />}

                {!isLoading && !error && (
                    <div className={styles.carousel}>
                        <button
                            type="button"
                            className={styles.navButton}
                            onClick={() => handleScroll("left")}
                            disabled={!canScrollLeft}
                            aria-label="Scroll to previous features"
                        >
                            <ChevronLeft size={20} aria-hidden="true" />
                        </button>

                        <div ref={trackRef} className={styles.track} onScroll={updateScrollState} role="list">
                            {features.map((feature) => (
                                <article key={feature.id} className={styles.card} role="listitem">
                                    <img
                                        src={feature.imageUrl}
                                        alt={feature.title}
                                        className={styles.image}
                                        loading="lazy"
                                    />
                                    <h3 className={styles.cardTitle}>{feature.title}</h3>
                                    <p className={styles.cardDescription}>{feature.description}</p>
                                </article>
                            ))}
                        </div>

                        <button
                            type="button"
                            className={styles.navButton}
                            onClick={() => handleScroll("right")}
                            disabled={!canScrollRight}
                            aria-label="Scroll to next features"
                        >
                            <ChevronRight size={20} aria-hidden="true" />
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}
