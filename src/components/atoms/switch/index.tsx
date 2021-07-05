import tw, { combine } from '@tailwind'

import type { SwitchComponent } from './types'

import styles from './switch.module.sass'

const SwitchSettingLayout: SwitchComponent = ({
	value,
	update
}) => {
	let toggle = () => {
		update(!value)
	}

	return (
		<button
			className={combine(
				styles.switch,
				value
					? tw`bg-gray-900 dark:bg-blue-600`
					: tw`bg-gray-200 dark:bg-gray-600`,
				tw`appearance-none border-0 rounded-full transition-colors cursor-pointer`
			)}
			onClick={toggle}
			type="button"
		>
			<div
				className={combine(
					styles.toggler,
					value ? styles['toggler-active'] : '',
					tw`bg-white rounded-full`
				)}
			/>
		</button>
	)
}

export default SwitchSettingLayout
