import type { FunctionComponent } from "react"

import type { Story } from "@types"

export interface DiscoverCardProps {
    story: Story
}

export type DiscoverCardComponent = FunctionComponent<DiscoverCardProps>