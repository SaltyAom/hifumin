import { useCallback, useRef, FormEvent, useEffect } from 'react'

import { useStoreon } from 'storeon/react'
import { SearchStore, SearchEvent } from '@stores'

import { Loader } from '@components'

import SearchIcon from './icon'

import './search.styl'

const Search = () => {
	let {
		dispatch,
		isLoading,
		useCurrentSearch,
		search: searchState
	} = useStoreon<SearchStore, SearchEvent>('isLoading', 'useCurrentSearch', 'search')

	let search = useRef('')

	let deferSearch = useCallback(
		(event: FormEvent<HTMLInputElement>) => {
			let { value } = event.currentTarget

			if (useCurrentSearch) dispatch('USE_CURRENT_SEARCH', false)

			search.current = value
			setTimeout(() => {
				if (value !== search.current) return

				dispatch('UPDATE_SEARCH', value.toLocaleLowerCase())
			}, 300)
		},
		[useCurrentSearch]
	)

	let preventDefault = useCallback((event) => {
		event.preventDefault()
	}, [])

	return (
		<header id="search">
			<h1 className="title">Opener Studio</h1>
			<section className="search-wrapper">
				<div className="search-bar" onSubmit={preventDefault}>
					<SearchIcon />
					<input
						className="input"
						type="text"
						name="Search"
						placeholder="Find hentai or 6 digits code"
						onInput={deferSearch}
						value={useCurrentSearch ? searchState : undefined}
					/>
					{isLoading && <Loader />}
				</div>
			</section>
		</header>
	)
}

export default Search
