import { combine } from '@tailwind'

import type { SpacerComponent } from './types'

import styles from './spacer.module.sass'

const Spacer: SpacerComponent = ({ small = false }) => (
	<br className={combine(styles.spacer, small ? styles.small : '')} />
)

export default Spacer
