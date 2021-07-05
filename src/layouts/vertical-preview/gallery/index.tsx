import type { FunctionComponent } from 'react'

import styles from './history.module.sass'

const VerticalGallery: FunctionComponent = ({ children }) => (
	<section className={styles.history}>{children}</section>
)

export default VerticalGallery