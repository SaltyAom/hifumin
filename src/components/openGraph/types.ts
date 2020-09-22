import { FunctionComponent } from 'react'

import { Page } from '@types'

export interface OpenGraphProps {
	title: string
	description: string
	author?: string
	icon?: string
	image?: Page
	shortName?: string
	name?: string
	twitterDevAccount?: string
	site?: string
}

export type OpenGraphComponent = FunctionComponent<OpenGraphProps>
