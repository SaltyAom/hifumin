import { FunctionComponent } from 'react'

export interface LabelProps {
	small?: boolean
}

export type LabelComponent = FunctionComponent<LabelProps>

export interface SettingLabelProps {
	title?: string
	details?: string[]
}

export type SettingLabelComponent = FunctionComponent<SettingLabelProps>
