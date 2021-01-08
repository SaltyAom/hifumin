import { ContainerComponent } from './types'

import styles from '../tag.module.sass'

const TagContainer: ContainerComponent = ({ children }) => (
	<section className={styles['tag-container']}>{children}</section>
)

export default TagContainer
