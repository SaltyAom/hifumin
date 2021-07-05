import type { FunctionComponent } from 'react'

import type { VerticalSettingLayoutProps } from '@layouts/settings/vertical/types'
import type { SwitchProps } from '@components/atoms/switch/types'

export type SwitchSettingProps = Omit<VerticalSettingLayoutProps, 'action'> &
	SwitchProps

export type SwitchSettingComponent = FunctionComponent<SwitchSettingProps>
