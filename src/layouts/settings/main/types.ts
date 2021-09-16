import type { FunctionComponent } from 'react'

import { SettingLabelProps } from '@layouts/settings/label/types'

export interface SettingStructure {
	id: string
	title?: string
	labels?: string[]
	page: string
}

export interface SettingLayoutProps {
	title: string
	labels?: SettingLabelProps['labels']
}

export type SettingLayoutComponent = FunctionComponent<SettingLayoutProps>
