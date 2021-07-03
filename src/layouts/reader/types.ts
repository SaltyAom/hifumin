import { FunctionComponent } from 'react'

import type { Story } from '@types'

export interface ReaderLayoutProps {
	story?: Story
	isValid?: boolean
}

export type ReaderLayoutComponent = FunctionComponent<ReaderLayoutProps>
