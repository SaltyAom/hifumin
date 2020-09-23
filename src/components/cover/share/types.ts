import { FunctionComponent } from 'react'

export interface ShareProps {
	id: string
	preload?: false
}

export interface PreloadShareProps {
	id?: null
	preload?: true
}

export type ShareComponent = FunctionComponent<ShareProps | PreloadShareProps>
