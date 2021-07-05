import { VerticalSetting } from '@layouts/settings'
import DropDown from '@atoms/dropdown'

import type { DropDownSettingComponent } from './types'

const DropDownSetting: DropDownSettingComponent = ({
	children,
	options,
	selected,
	update,
	footer,
	className = ''
}) => (
	<VerticalSetting
		className={className}
		action={
			<DropDown selected={selected} options={options} update={update} />
		}
		footer={footer}
	>
		{children}
	</VerticalSetting>
)

export default DropDownSetting
