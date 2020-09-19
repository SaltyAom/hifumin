import { FunctionComponent } from "react"

import { Story } from "@types"

export interface BookProps {
    story: Story
    preload?: false
}

export interface BookPropsPreload {
    story?: false
    preload?: true
}

export type BookComponent = FunctionComponent<BookProps | BookPropsPreload>