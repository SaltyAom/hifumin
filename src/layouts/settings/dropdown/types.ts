import type { FunctionComponent } from 'react'

import type { VerticalSettingLayoutProps } from '../vertical/types'

export interface DropDownSettingProps<T = any> extends Omit<VerticalSettingLayoutProps, 'action'> {
	selected: T
	options: T[]
	update: (select: T) => void
}

export type DropDownSettingComponent<T = any> = FunctionComponent<
	DropDownSettingProps<T>
>
