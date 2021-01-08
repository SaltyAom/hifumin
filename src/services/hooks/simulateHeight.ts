import {
	useState,
	useReducer,
	useRef,
	useCallback,
	useEffect,
	MutableRefObject, useMemo
} from 'react'

import { Page } from '@types'

interface SimulateHeightArgument {
	page: Page
	preload: boolean
	shouldLoad?: boolean
}

interface SimulatePreloadHeightArgument {
	page: undefined
	preload: true
	shouldLoad?: boolean
}

type UseSimulateHeight = (
	argument: SimulateHeightArgument | SimulatePreloadHeightArgument
) => [
	number | 'unset',
	{
		element: MutableRefObject<HTMLImageElement>
		stopSimulateImageHeight: () => void
	}
]
