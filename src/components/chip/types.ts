import { FunctionComponent } from 'react'

export interface ChipProps {
    children: any | any[]
    onClick?: (active: boolean) => void
    active?: boolean
    className?: string
}

export type ChipComponent = FunctionComponent<ChipProps>
