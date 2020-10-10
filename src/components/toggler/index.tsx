import './toggler.styl'

import { TogglerComponent } from './types'
import './types.ts'

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
			<div className="slider" />
		</button>
	)
}

export default Toggler
