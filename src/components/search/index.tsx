import { useCallback, useRef, FormEvent } from 'react'

import { useStoreon } from 'storeon/react'
import { SearchStore, SearchEvent } from '@stores'

import { Loader } from '@components'

import SearchIcon from './icon'

import './search.styl'

const Search = () => {
	let { dispatch, isLoading } = useStoreon<SearchStore, SearchEvent>(
		'isLoading'
	)

	let search = useRef('')

	let deferSearch = useCallback((event: FormEvent<HTMLInputElement>) => {
		let { value } = event.currentTarget

		search.current = value
		setTimeout(() => {
			if (value !== search.current) return

			dispatch('UPDATE_SEARCH', value.toLocaleLowerCase())
		}, 300)
	}, [])

	let preventDefault = useCallback((event) => {
		event.preventDefault()
	}, [])

	return (
		<header id="search">
			<h1 className="title">Opener Studio</h1>
			<form className="search-bar" onSubmit={preventDefault}>
				<SearchIcon />
				<input
					className="input"
					type="text"
					name="Search"
					placeholder="Find hentai or 6 digits code"
					onInput={deferSearch}
				/>
				{isLoading && <Loader />}
			</form>
		</header>
	)
}

export default Search
