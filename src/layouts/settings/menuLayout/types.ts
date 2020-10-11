import { FunctionComponent, ReactElement } from 'react'

export interface MenuLayoutProps {
	children: ReactElement | ReactElement[]
	title: string
	icon?: ReactElement
	id?: string
}

export type MenuLayoutComponent = FunctionComponent<MenuLayoutProps>
