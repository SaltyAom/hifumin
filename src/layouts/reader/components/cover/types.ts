import { FunctionComponent } from 'react'

import type { Story } from '@types'

export interface ReaderCoverProps {
    story: Story
}

export type ReaderCoverComponent = FunctionComponent<ReaderCoverProps>
