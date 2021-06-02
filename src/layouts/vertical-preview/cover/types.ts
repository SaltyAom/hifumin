import type { FunctionComponent } from "react"

import type { KnownStory } from "@stores/knownStory"

export interface VerticalCoverProps {
    story: KnownStory
}

export type VerticalCoverComponent = FunctionComponent<VerticalCoverProps>