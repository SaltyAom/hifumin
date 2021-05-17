import { FunctionComponent } from 'react'

import type { Story } from '@types'

export interface ReaderLayoutInvalidProps {
	story?: undefined
	isValid: false
}

export interface ReaderLayoutValidProps {
	story: Story
	isValid: true
}

export type ReaderLayoutProps =
	| ReaderLayoutInvalidProps
	| ReaderLayoutValidProps

export type ReaderLayoutComponent = FunctionComponent<ReaderLayoutProps>
