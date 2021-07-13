import type { Page, Info } from '@types'

export interface Similarity {
	id: number
	similarity: number
	thumbnail: string
	title: string | null
	artist: string[]
}

export type Similarities = Similarity[]

export interface CombinedSimilarity {
	id: number
	similarity: number
	display: string
	cover: Page
	info: Info
    language: string
}

export type CombinedSimilarities = CombinedSimilarity[]