import type { FunctionComponent } from 'react'

import type { PageProps } from '../../types'

export interface FigureProps extends PageProps {
    isBlur?: boolean
}

export type FigureComponent = FunctionComponent<FigureProps>
