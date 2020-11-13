import { FunctionComponent } from "react"

import { Story } from "@types"

export interface CoverProps {
    story: Story
    preload?: false
    preview?: boolean
}

export interface CoverPropsPreload {
    story?: null
    preload?: true
    preview?: boolean
}

export type CoverComponent = FunctionComponent<CoverProps | CoverPropsPreload>
