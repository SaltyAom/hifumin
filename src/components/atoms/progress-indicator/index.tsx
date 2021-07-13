import { useAtom } from 'jotai'
import { themeAtom, ThemeMode } from '@stores'

import { combine } from '@tailwind'

import styles from './progress-indicator.module.sass'

const ProgressIndicator = ({ className = '' }) => {
	let [theme] = useAtom(themeAtom)

	return (
		<div className={combine(styles.loader, className)}>
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