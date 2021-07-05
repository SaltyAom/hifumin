/* eslint-disable no-unused-vars */
import type { FunctionComponent, ReactNode } from 'react'

import { VerticalSettingLayoutProps } from '@layouts/settings/vertical/types'
import type { DropDownProps } from '@components/atoms/dropdown/types'

type DropDownSettingProps<T = any> = DropDownProps<T> & Omit<VerticalSettingLayoutProps, 'action'>

export type DropDownSettingComponent<T = any> = FunctionComponent<
	DropDownSettingProps<T>
>
