import { FunctionComponent } from "react"

import { Story } from "@types"

export interface BookProps {
    story: Story
    preload?: false
}

export interface PreloadBookProps {
    story?: Story
    preload?: true
}

export type BookComponent = FunctionComponent<BookProps | PreloadBookProps>