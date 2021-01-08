import { FunctionComponent, ReactElement } from "react";

export interface SettingsLayoutProps {
    children: ReactElement | ReactElement[]
    title?: string
}

export type SettingsLayoutComponent = FunctionComponent<SettingsLayoutProps>
