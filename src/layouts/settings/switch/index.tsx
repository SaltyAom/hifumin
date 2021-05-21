import tw, { combine } from '@tailwind'

import { VerticalSettingLayout } from '../vertical'

import type { SwitchSettingComponent } from './types'

import styles from './switch.module.sass'

export const SwitchSettingLayout: SwitchSettingComponent = ({
	children,
	value,
	update,
	footer
}) => {
	let toggle = () => {
		update(!value)
	}

	return (
		<VerticalSettingLayout
			footer={footer}
			action={
				<button
					className={combine(
						styles.switch,
						value ? tw`bg-gray-900` : tw`bg-gray-200`,
						tw`appearance-none border-0 rounded-full transition-colors cursor-pointer`
					)}
					onClick={toggle}
				>
					<div
						className={combine(
							styles.toggler,
							value ? styles['toggler-active'] : '',
							tw`bg-white rounded-full`
						)}
					/>
				</button>
			}
		>
			{children}
		</VerticalSettingLayout>
	)
}
