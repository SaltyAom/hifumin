import { FunctionComponent } from 'react'

export interface LabelProps {
	small?: boolean
}

export type SettingLabelComponent = FunctionComponent<LabelProps>

export interface SettingLabelProps {
	title?: string
	details?: string[]
}

export type SettingLabelsComponent = FunctionComponent<SettingLabelProps>
