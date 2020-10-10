import { FunctionComponent } from "react"

export interface TogglerProps {
    active: boolean
    onSwitch: (isActive: boolean) => any    
}

export type TogglerComponent = FunctionComponent<TogglerProps>