import { FunctionComponent } from "react"

import { Story } from "@types"

export interface CoverProps<T = Story | null> {
    story: T
    preload?: T extends Story ? false : null
    preview?: boolean
}

export type CoverComponent = FunctionComponent<CoverProps>
