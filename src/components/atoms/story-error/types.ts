import type { FunctionComponent } from 'react'

export interface StoryErrorProps {
	error: string | null
}

export type StoryErrorComponent = FunctionComponent<StoryErrorProps>
