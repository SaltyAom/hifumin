import { FunctionComponent } from 'react'

import { Page } from '@types'

export interface OpenGraphProps {
	title: string
	description: string
	author?: string
	icon?: string
	image?: Page
	name?: string
	twitterDevAccount?: string
}

export type OpenGraphComponent = FunctionComponent<OpenGraphProps>
