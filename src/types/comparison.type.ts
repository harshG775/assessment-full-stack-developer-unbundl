export type ComparisonStatus = "yes" | "no"

export interface ComparisonValue {
    status: ComparisonStatus
    label: string
}

export interface ComparisonRow {
    id: string
    feature: string
    detail: string
    whistle: ComparisonValue
    otherBrands: ComparisonValue
}

export interface ComparisonResponse {
    rows: ComparisonRow[]
}
