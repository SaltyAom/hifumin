import type { FunctionComponent } from 'react'

import type { Page } from '@types'

export interface OpenGraphProps {
	title?: string
	alternativeTitle?: string[]
	description?: string
	author?: string
	icon?: string
	image?: Page
	name?: string
	twitterDevAccount?: string
	id?: number
}

export type OpenGraphComponent = FunctionComponent<OpenGraphProps>