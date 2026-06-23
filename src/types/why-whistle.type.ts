export interface Feature {
    id: string
    title: string
    description: string
    imageUrl: string
}

export interface FeaturesResponse {
    features: Feature[]
}
