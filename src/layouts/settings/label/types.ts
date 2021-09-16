import { FunctionComponent } from 'react'

import type { SettingStructure } from '@layouts/settings/main/types'

export interface LabelProps {
	small?: boolean
}

export type SettingLabelComponent = FunctionComponent<LabelProps>

export interface SettingLabelProps extends Omit<SettingStructure, 'page'> {}

export type SettingLabelsComponent = FunctionComponent<SettingLabelProps>
