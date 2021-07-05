/* eslint-disable no-unused-vars */
import type { FunctionComponent, ReactNode } from 'react'

export interface DropDownProps<T = any> {
	selected: T
	options: T[]
	update: (select: T) => void
}

export type DropDownComponent<T = any> = FunctionComponent<DropDownProps<T>>
