import type { FunctionComponent } from 'react'

import type {  Icon } from 'react-feather'

export type BaseLayoutTab = readonly [Icon, string, string]
export type BaseLayoutTabs = readonly BaseLayoutTab[]

export interface BaseLayoutTabProps {
    Icon: Icon
    title: string
    link: string
}

export type BaseLayoutTabComponent = FunctionComponent<BaseLayoutTabProps>
