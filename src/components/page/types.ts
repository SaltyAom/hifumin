import { FunctionComponent } from 'react'

import { Page } from '@types'

export interface PageProps<T = boolean> {
    page?: T extends true ? undefined : Page
    alt?: string
    preload?: T
    quality?: number
}

export type PageComponent = FunctionComponent<PageProps>
