import { FunctionComponent } from 'react'

export interface PageProps {
    link?: string
    index?: number
    preload?: boolean
}

export type PageComponent = FunctionComponent<PageProps>