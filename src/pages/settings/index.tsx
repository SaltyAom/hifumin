import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { useAtom } from 'jotai'
import {
	settingPageAtom,
	SettingPagePath,
	SettingPage
} from '@stores/setting-page'

import { SettingLayout, SettingTab, settings } from '@layouts/settings'
import SearchSetting from '@layouts/settings/search'

import tw from '@tailwind'

const Settings = () => {
	let [settingPage] = useAtom(settingPageAtom)

	let { replace } = useRouter()

	useEffect(() => {
		if (!settingPage) return

		if (window.innerWidth >= 768)
			replace(
				`/settings/${SettingPagePath[SettingPage[settingPage]].replace(
					' ',
					'-'
				)}`
			)
	}, [])

	return (
		<SettingLayout
			title="Settings"
			labels={[
				'Customize how platform should behave to fit your preference.'
			]}
		>
			<SearchSetting />
			<section
				className={tw`flex sm:hidden flex-col gap-1 w-full rounded-lg`}
			>
				{settings.map(([label, icon, color], index) => (
					<>
						{index !== 0 ? (
							<div
								aria-hidden
								className={tw`w-full h-[1px] bg-gray-200 dark:bg-gray-600`}
							/>
						) : null}
						<SettingTab
							href={label.replace(' ', '-')}
							icon={icon}
							color={color}
						>
							{label}
						</SettingTab>
					</>
				))}
			</section>
		</SettingLayout>
	)
}

export default Settings
