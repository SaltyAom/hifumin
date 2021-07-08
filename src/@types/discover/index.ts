import type { FunctionComponent, RefObject } from 'react'

import type { CombinedError } from 'urql'

import type { Stories } from '@types'

export interface DiscoverProps {
	spaces: number
	initial?: Stories
	error?: CombinedError | null
	layoutRef: RefObject<HTMLElement>
}

export type DiscoverComponents = FunctionComponent<DiscoverProps>
