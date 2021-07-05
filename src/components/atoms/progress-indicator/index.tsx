import { useAtom } from 'jotai'
import { themeAtom, ThemeMode } from '@stores'

import styles from './progress-indicator.module.sass'

const ProgressIndicator = () => {
	let [theme] = useAtom(themeAtom)

	return (
		<div className={styles.loader}>
			<svg className={styles.circular} viewBox="25 25 50 50">
				<circle
					className={styles.path}
					stroke={theme === ThemeMode.light ? '#000' : '#fff'}
					cx="50"
					cy="50"
					r="20"
					fill="none"
					strokeWidth="4"
					strokeMiterlimit="10"
				/>
			</svg>
		</div>
	)
}

export default ProgressIndicator