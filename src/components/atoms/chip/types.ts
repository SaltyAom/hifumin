/* eslint-disable no-unused-vars */
import type { FunctionComponent, MouseEvent } from 'react'

export interface ChipProps {
	value: string
	onClick?: (value: string, event: MouseEvent) => void
	active?: boolean
	removable?: boolean
	onRemove?: (value: string) => void
	className?: string
}

export type ChipComponent = FunctionComponent<ChipProps>
