import type { SettingStructure } from '@layouts/settings/main/types'

export const settings = {
	appearance: {
		theme: {
			id: 'theme',
			title: 'Theme Mode',
			labels: [
				'Set color theme.',
				'Choosing "adaptive" will use the system setting.'
			]
		},
		safe: {
			id: 'safe',
			title: 'Safe Mode',
			labels: ['Hide the image when the sudden attack come in.']
		}
	},
	'data-usage': {
		history: {
			id: 'history',
			title: 'Save History',
			labels: ['Save browsing history']
		}
	},
	filter: {
		filter: {
			id: 'filter',
			title: 'Use default filter',
			labels: []
		}
	},
	performance: {
		compression: {
			id: 'image-compression',
			title: 'Image compression',
			labels: ['Select how the image should be displayed.']
		}
	},
	preference: {
		preference: {
			id: 'preference',
			title: 'Use default preference',
			labels: []
		}
	}
}

export const structuredSettings: SettingStructure[] = Object.keys(
	settings
).flatMap((page) => {
	const settingGroup = settings[page as keyof typeof settings]

	return Object.keys(settingGroup).map((type) => {
		const setting: Object = settingGroup[type as keyof typeof settingGroup]

		return {
			...setting,
			page
		} as SettingStructure
	})
})
