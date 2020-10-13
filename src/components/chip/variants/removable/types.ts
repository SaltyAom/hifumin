import { FunctionComponent } from 'react'

import { ChipProps } from '../../types'

export interface RemovableChipProps extends Omit<ChipProps, 'onClick'> {
    onClick: (preference: string) => void
}

export type RemovableChipComponent = FunctionComponent<RemovableChipProps>