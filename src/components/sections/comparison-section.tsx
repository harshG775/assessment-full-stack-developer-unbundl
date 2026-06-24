import { useState } from "react"
import { Check, ChevronDown, X } from "lucide-react"
import { useComparison } from "#/hooks/use-comparison"
import Skeleton from "#/components/ui/skeleton"
import type { ComparisonValue } from "#/types/comparison.type"
import styles from "./comparison-section.module.css"

const ROW_SKELETON_COUNT = 6

function StatusCell({ value }: { value: ComparisonValue }) {
    const isYes = value.status === "yes"
    return (
        <span className={styles.statusCell} data-status={value.status}>
            {isYes ? (
                <Check className={styles.statusIcon} size={16} aria-hidden="true" />
            ) : (
                <X className={styles.statusIcon} size={16} aria-hidden="true" />
            )}
            {value.label && <span className={styles.statusLabel}>{value.label}</span>}
        </span>
    )
}

function ComparisonSkeleton() {
    return (
        <div aria-busy="true" aria-label="Loading comparison">
            {Array.from({ length: ROW_SKELETON_COUNT }).map((_, i) => (
                <div key={i} className={styles.skeletonRow}>
                    <Skeleton height="16px" style={{ width: "60%" }} />
                    <Skeleton height="16px" style={{ width: "70%" }} />
                    <Skeleton height="16px" style={{ width: "70%" }} />
                </div>
            ))}
        </div>
    )
}

export default function ComparisonSection() {
    const { rows, isLoading, error } = useComparison()
    const [openIds, setOpenIds] = useState<Set<string>>(new Set())

    function handleToggle(id: string) {
        setOpenIds((current) => {
            const next = new Set(current)
            if (next.has(id)) {
                next.delete(id)
            } else {
                next.add(id)
            }
            return next
        })
    }

    return (
        <section className={styles.section}>
            <div className="container">
                <h2 className={styles.heading}>What sets Whistle apart?</h2>

                {error && (
                    <p className={styles.status} role="alert">
                        Couldn&apos;t load the comparison right now. Please try again later.
                    </p>
                )}

                {isLoading && <ComparisonSkeleton />}

                {!isLoading && !error && (
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th className={styles.th} style={{ width: "100%" }}>
                                        Features
                                    </th>
                                    <th className={styles.th}>
                                        <img src="/whistle.png" alt="whistle" />
                                    </th>
                                    <th className={styles.th}>Other Brands</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row) => {
                                    const isOpen = openIds.has(row.id)
                                    const detailId = `comparison-detail-${row.id}`
                                    const buttonId = `comparison-trigger-${row.id}`

                                    return (
                                        <>
                                            <tr key={row.id} className={styles.row}>
                                                <td className={styles.td}>
                                                    <button
                                                        type="button"
                                                        id={buttonId}
                                                        className={styles.featureTrigger}
                                                        aria-expanded={isOpen}
                                                        aria-controls={detailId}
                                                        onClick={() => handleToggle(row.id)}
                                                    >
                                                        <span>{row.feature}</span>
                                                        <ChevronDown
                                                            className={styles.chevron}
                                                            data-open={isOpen}
                                                            size={16}
                                                            aria-hidden="true"
                                                        />
                                                    </button>
                                                </td>
                                                <td className={styles.td}>
                                                    <StatusCell value={row.whistle} />
                                                </td>
                                                <td className={styles.td}>
                                                    <StatusCell value={row.otherBrands} />
                                                </td>
                                            </tr>
                                            <tr key={`${row.id}-detail`} className={styles.detailRow}>
                                                <td colSpan={3} className={styles.detailCell}>
                                                    <div
                                                        id={detailId}
                                                        role="region"
                                                        aria-labelledby={buttonId}
                                                        className={styles.detailWrapper}
                                                        data-open={isOpen}
                                                    >
                                                        <div className={styles.detailInner}>
                                                            <p className={styles.detailText}>{row.detail}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </section>
    )
}
