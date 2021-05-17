import { FunctionComponent, RefObject } from "react"

export interface DiscoverLayoutProps {
    layoutRef: RefObject<HTMLElement>
}

export type DiscoverLayoutComponent = FunctionComponent<DiscoverLayoutProps>
