import { FunctionComponent, ReactChildren } from 'react'

export interface ContainerProps {
    children: JSX.Element[] | ReactChildren
}

export type ContainerComponent = FunctionComponent<ContainerProps>