export interface Page {
	info: {
		width: number
		height: number
		type?: "jpg" | "png" | "gif"
	}
	link: string
}

export type Pages = Page[]


export interface Image {
    cover: Page
    pages: Pages
}

export interface Upload {
	original: number
	parsed: string
}

export interface Info {
	amount: number
	favorite: number
	upload: Upload
}


export interface Artist {
	count: number
	name: string
	url: string
}

export interface Tag {
	count: number
	name: string
	url: string
}

export type Tags = Tag[]

export interface Metadata {
	artist: Artist
	language: string
	tags: Tags
}

export interface Title {
	display: string
	english: string
	japanese: string
}


export interface Story {
	id: number
	images: Image
	info: Info
	metadata: Metadata
	title: Title
}

export type Stories = Story[]
