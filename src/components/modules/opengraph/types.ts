import { FunctionComponent } from 'react'

export interface OpenGraphProps {
    title?: string
    description?: string
    image?: string
}

export type OpenGraphComponent = FunctionComponent<OpenGraphProps>
