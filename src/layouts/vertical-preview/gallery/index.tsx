import type { FunctionComponent } from 'react'

import styles from './history.module.sass'

export const VerticalGallery: FunctionComponent = ({ children }) => (
	<section className={styles.history}>{children}</section>
)
