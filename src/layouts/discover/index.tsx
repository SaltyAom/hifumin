import { useCallback, useRef, useEffect } from 'react'
import type { FormEvent } from 'react'

import { useRouter } from 'next/router'

import { useAtom } from 'jotai'
import { searchAtom } from '@stores/search'

import { Search } from 'react-feather'

import tw from '@tailwind'

import { isNhentai } from '@services/validation'

import type { DiscoverLayoutComponent } from './types'

const DiscoverLayout: DiscoverLayoutComponent = ({ children, layoutRef }) => {
	let [sharedKeyword, updateKeyword] = useAtom(searchAtom)
	let keyword = useRef<HTMLInputElement>(null)


	let { push } = useRouter()

	useEffect(() => {
		if (!sharedKeyword) return

		if (isNhentai(sharedKeyword)) {
			push(`/h/${sharedKeyword}`)
			updateKeyword('')
		}
	}, [sharedKeyword])

	let handleSearch = useCallback((event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		if (keyword.current) updateKeyword(keyword.current.value)
	}, [])

	return (
		<>
			<header
				className={tw`sticky top-[64px] lg:top-0 z-30 lg:mx-0 px-2 my-2 lg:my-0 py-2 lg:px-4 lg:py-4 bg-white dark:bg-gray-800`}
			>
				<form
					className={tw`flex flex-row items-center text-gray-600 dark:text-gray-400 pl-4 bg-gray-100 dark:bg-gray-700 rounded-lg`}
					onSubmit={handleSearch}
				>
					<Search />
					<input
						ref={keyword}
						defaultValue={sharedKeyword}
						className={tw`w-full text-2xl text-gray-800 dark:text-gray-200 pl-2 py-3 bg-transparent border-0 outline-none`}
						type="text"
						placeholder="Find hentai"
					/>
				</form>
			</header>
			<main
				ref={layoutRef}
				className={tw`flex flex-1 flex-row gap-4 px-2 lg:px-4`}
			>
				{children}
			</main>
		</>
	)
}

export { DiscoverCard } from './components'
export default DiscoverLayout
