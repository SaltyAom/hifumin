import type { FunctionComponent, ReactChild } from 'react'

export interface SettingTabProps {
	href: string
	icon: ReactChild
	color: string
}

export type SettingTabComponent = FunctionComponent<SettingTabProps>
