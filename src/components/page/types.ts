import { FunctionComponent } from 'react'

import { Page } from '@types'

export interface PageProps {
    page: Page
    alt?: string
    preload?: boolean
}

export interface PreloadPageProps {
    page?: Page
    alt?: string
    preload: true
}

export type PageComponent = FunctionComponent<PageProps | PreloadPageProps>