import { useCallback, useRef } from 'react'
import type { FormEventHandler } from 'react'

import { useRouter } from 'next/router'

import { useAtom } from 'jotai'
import { searchKeywordAtom, searchSettingAtom } from '@stores/search-settings'

import { Search } from 'react-feather'

import tw, { combine } from '@tailwind'

import { structuredSettings } from '@services/settings'
import type { SettingStructure } from '@layouts/settings/main/types'

import type IFuse from 'fuse.js'

const SearchSetting = ({ tint = false, dense = false }) => {
	let formRef = useRef<HTMLInputElement>(null)
	let [, updateSearch] = useAtom(searchSettingAtom)
	let [keyword, updateSearchKeyword] = useAtom(searchKeywordAtom)

	let { asPath, replace } = useRouter()

	let search = useCallback(async () => {
		if (!formRef.current) return

		let {
			current: { value }
		} = formRef

		// eslint-disable-next-line global-require
		let { default: Fuse } = await require('fuse.js')

		let engine: IFuse<SettingStructure> = new Fuse(structuredSettings, {
			keys: ['title', 'labels']
		})

		updateSearch(engine.search(value).map(({ item }) => item))
		updateSearchKeyword(value)
	}, [])

	let handleSubmit: FormEventHandler = useCallback(async (event) => {
		event.preventDefault()

		await search()

		if (asPath !== '/settings/search') replace('/settings/search')
	}, [asPath])

	return (
		<form
			className={combine(
				tw`relative flex flex-row items-center w-full capitalize font-medium mb-2 rounded`,
				tint
					? tw`bg-gray-100 dark:bg-gray-800`
					: tw`bg-gray-100 dark:bg-gray-900`,
				dense ? tw`h-[42px] px-2` : tw`h-[56px] px-4`
			)}
			onSubmit={handleSubmit}
		>
			<Search
				size={dense ? 24 : 28}
				className={tw`text-gray-400 dark:text-gray-500 mr-2`}
			/>
			<input
				ref={formRef}
				value={keyword}
				className={combine(
					tw`text-gray-800 dark:text-white w-full h-full border-0 bg-transparent`,
					dense ? tw`text-xl` : tw`text-2xl`
				)}
				placeholder="Find settings"
				onChange={search}
			/>
		</form>
	)
}

export default SearchSetting
