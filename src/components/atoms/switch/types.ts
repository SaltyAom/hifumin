/* eslint-disable no-unused-vars */
import type { FunctionComponent } from 'react'

export interface SwitchProps {
	value: boolean
	update: (updated: boolean) => void
}

export type SwitchComponent = FunctionComponent<SwitchProps>
