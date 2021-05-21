import { FunctionComponent, ReactNode } from 'react'

export interface VerticalSettingLayoutProps {
	action: ReactNode
	footer?: ReactNode
}

export type VerticalSettingLayoutComponent =
	FunctionComponent<VerticalSettingLayoutProps>
