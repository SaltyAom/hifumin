import { FunctionComponent } from 'react'

export interface SwitchSettingProps {
	value: boolean
	update: (updated: boolean) => void
}

export type SwitchSettingComponent =
	FunctionComponent<SwitchSettingProps>
