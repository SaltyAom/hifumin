import { FunctionComponent } from 'react'

import { TogglerProps } from '@components/toggler/types'

export interface MenuLinkProps {
	children: string
	href: string
}

export type MenuLinkComponent = FunctionComponent<MenuLinkProps>

export interface MenuToggleProps extends TogglerProps {
    children: string
}

export type MenuToggleComponent = FunctionComponent<MenuToggleProps>