import type { FunctionComponent } from 'react'

import type { CombinedError } from 'urql'

import type { Stories } from '@types'

export interface DiscoverProps {
	spaces: number
	initial?: Stories
	error?: CombinedError | null
}

export type DiscoverComponents = FunctionComponent<DiscoverProps>
