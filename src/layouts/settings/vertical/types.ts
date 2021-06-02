import { FunctionComponent, ReactNode } from 'react'

export interface VerticalSettingLayoutProps {
	action: ReactNode
	footer?: ReactNode
	className?: string
}

export type VerticalSettingLayoutComponent =
	FunctionComponent<VerticalSettingLayoutProps>
