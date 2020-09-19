import { FunctionComponent } from 'react'

export interface PageProps {
    link?: string
    alt?: string
    preload?: boolean
}

export type PageComponent = FunctionComponent<PageProps>