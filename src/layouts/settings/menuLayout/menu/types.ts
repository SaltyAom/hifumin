import { FunctionComponent, ReactElement } from 'react'

import { TogglerProps } from '@components/toggler/types'

export interface MenuBaseProps {
	children: string
	disabled?: boolean
}

export type MenuBaseComponent = FunctionComponent<MenuBaseProps>

export interface MenuContainerProps extends Omit<MenuBaseProps, 'children'> {
	children: ReactElement | ReactElement[]
}

export type MenuContainerComponent = FunctionComponent<MenuContainerProps>

export interface MenuLinkProps extends MenuBaseProps {
	href: string
}

export type MenuLinkComponent = FunctionComponent<MenuLinkProps>

export interface MenuButtonProps extends MenuBaseProps {
	detail: string
	onClick: <T>(event: T) => void
}

export type MenuButtonComponent = FunctionComponent<MenuButtonProps>

export interface MenuToggleProps extends TogglerProps, MenuBaseProps {}

export type MenuToggleComponent = FunctionComponent<MenuToggleProps>
