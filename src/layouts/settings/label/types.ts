import { FunctionComponent } from 'react'

export interface SettingLabelProps {
	title?: string
	details?: string[]
}

export type SettingLabelComponent = FunctionComponent<SettingLabelProps>
