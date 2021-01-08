import { FunctionComponent, ReactElement } from "react"

export interface HydrateStoreProviderProps {
    children: ReactElement
}

export type HydrateStoreProviderComponents = FunctionComponent<HydrateStoreProviderProps>