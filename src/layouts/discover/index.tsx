import { useCallback, useEffect, useRef } from 'react'
import type { FormEvent, ChangeEventHandler } from 'react'

import { useRouter } from 'next/router'

import { useAtom } from 'jotai'
import { searchAtom } from '@stores/search'

import { Search } from 'react-feather'

import tw from '@tailwind'

import type { DiscoverLayoutComponent } from './types'
import { isNhentai } from '@services/validation'

export const DiscoverLayout: DiscoverLayoutComponent = ({
	children,
	layoutRef
}) => {
	let [sharedKeyword, updateKeyword] = useAtom(searchAtom)
	let keyword = useRef<HTMLInputElement>(null)

	let { push } = useRouter()

	useEffect(() => {
		if (isNhentai(sharedKeyword)) {
			push(`/h/${sharedKeyword}`)
			updateKeyword('')
		} else if (sharedKeyword)
			window.history.pushState(
				sharedKeyword,
				sharedKeyword,
				`/search/${sharedKeyword}`
			)
	}, [sharedKeyword])

	let handleSearch = useCallback((event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		if (keyword.current) updateKeyword(keyword.current.value)
	}, [])

	let handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
		(event) => {
			if (event.currentTarget.value) return

			updateKeyword('')
			push('/')
		},
		[]
	)

	return (
		<>
			<header className={tw`sticky top-[64px] lg:top-0 z-30 mx-2 lg:mx-0 px-2 my-2 lg:my-0 py-2 lg:py-4 bg-white`}>
				<form
					className={tw`flex flex-row items-center text-gray-600 pl-4 bg-gray-100 rounded-lg`}
					onSubmit={handleSearch}
				>
					<Search />
					<input
						ref={keyword}
						defaultValue={sharedKeyword}
						className={tw`w-full text-2xl pl-2 py-3 bg-transparent border-0 outline-none`}
						type="text"
						placeholder="Find hentai"
						onChange={handleChange}
					/>
				</form>
			</header>
			<main ref={layoutRef} className={tw`flex flex-1 flex-row px-2 lg:px-0`}>
				{children}
			</main>
		</>
	)
}

export { DiscoverCard } from './components'
