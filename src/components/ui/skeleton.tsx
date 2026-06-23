import React from "react"
import styles from "./skeleton.module.css"

type SkeletonVariant = "rectangle" | "circle"

const variantClass: Record<SkeletonVariant, string> = {
    rectangle: styles.rectangle,
    circle: styles.circle,
}

interface SkeletonProps {
    variant?: SkeletonVariant
    width?: string
    height?: string
    className?: string
    style?: React.CSSProperties
}

const Skeleton = ({ variant = "rectangle", width, height, className = "", style = {} }: SkeletonProps) => {
    const classes = [styles.skeleton, variantClass[variant], className].filter(Boolean).join(" ")

    return <span className={classes} style={{ width, height, ...style }} role="presentation" aria-hidden="true" />
}

export default Skeleton
