import { TogglerComponent } from './types'

import styles from './toggler.module.sass'

const Toggler: TogglerComponent = ({ active, onSwitch }) => {
	const handleSwitch = () => {
		onSwitch(active)
	}

	return (
		<button
			className={`toggler ${active ? '-active' : ''}`}
			onClick={handleSwitch}
			aria-label={active ? 'on' : 'off'}
		>
			<div className={styles.slider} />
		</button>
	)
}

export default Toggler
