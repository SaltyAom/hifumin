import type { FunctionComponent } from 'react'

import type { VerticalSettingLayoutProps } from '../vertical/types'

export interface SwitchSettingProps extends Omit<VerticalSettingLayoutProps, 'action'> {
	value: boolean
	update: (updated: boolean) => void
}

export type SwitchSettingComponent =
	FunctionComponent<SwitchSettingProps>
