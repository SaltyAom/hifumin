import type { FunctionComponent } from "react"

import type { Story } from "@types"

export interface BookmarkProps {
    story: Story
}

export type BookmarkComponent = FunctionComponent<BookmarkProps>