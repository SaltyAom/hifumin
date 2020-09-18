import { FunctionComponent } from "react"

import { Story } from "@types"

export interface CoverProps {
    story: Story
    preload?: false
}

export interface CoverPropsPreload {
    story?: null
    preload?: true
}

export type CoverComponent = FunctionComponent<CoverProps | CoverPropsPreload>
