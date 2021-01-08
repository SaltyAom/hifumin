import { FunctionComponent } from "react"

import { Story } from "@types"

export interface BookProps<T = boolean> {
    story?: T extends false ? Story : undefined
    preload?: T
}

export type BookComponent = FunctionComponent<BookProps>