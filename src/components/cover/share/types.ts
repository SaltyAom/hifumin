import { FunctionComponent } from 'react'

export interface ShareProps {
	id: string
	title: string
	preload?: false
}

export interface PreloadShareProps {
	id?: null
	title?: null
	preload?: true
}

export type ShareComponent = FunctionComponent<ShareProps | PreloadShareProps>
