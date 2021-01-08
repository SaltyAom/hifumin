import { FunctionComponent } from "react"

import { Story } from "@types"

export interface CoverProps<T = boolean> {
    story?: T extends true ? undefined : Story
    preload?: T
    preview?: boolean
}

export type CoverComponent = FunctionComponent<CoverProps>
