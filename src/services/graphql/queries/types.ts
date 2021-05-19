import { Story, Stories } from '@types'

export interface HentaiQuery<T> {
	success: boolean
	error: string
	data: T
}

export interface GetHentaiById {
	getHentaiById: {
		success: boolean
		error: string
		data: Story
	}
}

export interface GetHentaiByIdVariables {
	id: number
}

export interface SearchHentai {
	searchHentai: {
		success: boolean
		error: string
		data: Stories
	}
}

export interface SearchHentaiVariables {
	keyword: string
	page?: number
}
