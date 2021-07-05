import tw, { combine } from '@tailwind'

import { VerticalSetting } from '@layouts/settings'
import { Switch } from '@components/atoms'

import type { SwitchSettingComponent } from './types'

const SwitchSetting: SwitchSettingComponent = ({
	children,
	value,
	update,
	footer,
	className = ''
}) => (
	<VerticalSetting
		className={combine(className, tw`!flex-row items-center`)}
		action={<Switch value={value} update={update} />}
		footer={footer}
	>
		{children}
	</VerticalSetting>
)

export default SwitchSetting
