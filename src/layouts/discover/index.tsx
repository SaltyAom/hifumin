import { useCallback, useRef, useEffect, ChangeEventHandler } from 'react'
import type { FormEvent } from 'react'

import { useRouter } from 'next/router'

import { useAtom } from 'jotai'
import { searchAtom } from '@stores/search'

import { Search } from 'react-feather'

import tw from '@tailwind'

import { isNhentai } from '@services/validation'

import { SearchHeader } from './components'

import type { DiscoverLayoutComponent } from './types'

const DiscoverLayout: DiscoverLayoutComponent = ({ children, layoutRef }) => {
	let [sharedKeyword, updateKeyword] = useAtom(searchAtom)
	let keyword = useRef<HTMLInputElement>(null)

	let { push } = useRouter()

	useEffect(() => {
		if (!sharedKeyword) return

		push('/search/[keyword]', `/search/${sharedKeyword}`)

		if (isNhentai(sharedKeyword)) {
			push('/h/[id]', `/h/${sharedKeyword}`)
			updateKeyword('')
		}
	}, [sharedKeyword])

	let handleSearch = useCallback((event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		if (keyword.current) updateKeyword(keyword.current.value)
		if (keyword.current?.value === '')
			window.history.pushState(
				'Opener Studio',
				`Search - Opener Studio`,
				`/`
			)
	}, [])

	return (
		<>
			<SearchHeader expanded={sharedKeyword === ''}>
				<form
					className={tw`flex flex-row items-center w-full text-gray-600 dark:text-gray-400 pl-4 bg-gray-100 dark:bg-gray-700 rounded-lg`}
					onSubmit={handleSearch}
				>
					<Search />
					<input
						ref={keyword}
						defaultValue={sharedKeyword}
						className={tw`w-full text-2xl text-gray-800 dark:text-gray-200 pl-2 py-3 bg-transparent border-0 outline-none`}
						type="text"
						placeholder="Find hentai or 6 digits code"
					/>
				</form>
			</SearchHeader>
			<section
				ref={layoutRef}
				className={tw`flex flex-1 flex-row items-start gap-4 px-4`}
			>
				{children}
			</section>
		</>
	)
}

export { DiscoverCard } from './components'
export default DiscoverLayout
