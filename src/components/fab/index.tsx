import { ChevronUp } from '@icons'

import styles from './fab.module.sass'

const FloatingActionButton = () => {
    const backToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

	return (
		<button id={styles['fab" aria-label="Back to Top']} onClick={backToTop}>
			<ChevronUp />
		</button>
	)
}

export default FloatingActionButton
