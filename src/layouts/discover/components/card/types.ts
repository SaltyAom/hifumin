import { FunctionComponent } from "react"

import { Story } from "@types"

export interface DiscoverCardProps {
    story: Story
}

export type DiscoverCardComponent = FunctionComponent<DiscoverCardProps>