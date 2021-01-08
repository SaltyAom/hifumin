import { FunctionComponent } from "react"

export interface TagProps<T = boolean> {
    children?: T extends true ? null : string
    preload?: T
    style?: Object
}

export type TagComponent = FunctionComponent<TagProps>