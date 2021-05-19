import { FunctionComponent } from 'react'

export interface DropDownSettingProps<T = any> {
	selected: T
	options: T[]
	update: (select: T) => void
}

export type DropDownSettingComponent<T = any> = FunctionComponent<
	DropDownSettingProps<T>
>
