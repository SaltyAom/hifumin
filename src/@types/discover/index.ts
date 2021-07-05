import type { FunctionComponent } from 'react'

import type { Stories } from '@types'

export interface DiscoverProps {
	spaces: number
	initial?: Stories
}

export type DiscoverComponents = FunctionComponent<DiscoverProps>
