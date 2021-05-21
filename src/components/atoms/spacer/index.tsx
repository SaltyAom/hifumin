import { combine } from '@tailwind'

import styles from './spacer.module.sass'

import type { SpacerComponent } from './types'

export const Spacer: SpacerComponent = ({ small = false }) => (
	<br className={combine(styles.spacer, small ? styles.small : '')} />
)
