import type { FunctionComponent } from "react"

import { SettingLabelProps } from "@layouts/settings/label/types"

export interface SettingLayoutProps {
    title: string
    labels?: SettingLabelProps['details']
}

export type SettingLayoutComponent = FunctionComponent<SettingLayoutProps>