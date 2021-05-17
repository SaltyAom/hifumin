import type { FunctionComponent } from 'react'

import type { Page } from '@types'

export interface PageProps {
    page: Page
    className?: string
    lazyLoad?: boolean
}

export type PageComponent = FunctionComponent<PageProps>