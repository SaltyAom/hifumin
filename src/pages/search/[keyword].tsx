import { useEffect, useMemo, useReducer, useRef } from 'react'
import type { FunctionComponent } from 'react'

import type { GetStaticPaths, GetStaticProps } from 'next'

import { useAtom } from 'jotai'
import { searchAtom } from '@stores/search'

import { DiscoverLayout } from '@layouts/discover'
import { SearchResults } from '@components/modules/discover'

import type { DiscoverProps } from '@pages/index'

import { getPreviews } from '@services/graphql'
import { useRouter } from 'next/router'
import { useComputedSpace } from '@services/hooks'

let getKeyword = (keyword: string) => decodeURI(keyword.replace('/search/', ''))

const Search: FunctionComponent<DiscoverProps> = ({ stories: initial }) => {
	let [search, updateSearch] = useAtom(searchAtom)
	let [keywordChange, notifyKeywordChange] = useReducer(() => true, false)

	let layout = useRef<HTMLElement>(null)
	let spaces = useComputedSpace(layout)

	let { asPath } = useRouter()

	let keyword = useMemo(() => getKeyword(asPath), [])

	useEffect(() => {
		updateSearch(keyword)
	}, [])

	useEffect(() => {
		if (search && keyword !== search) notifyKeywordChange()
	}, [search])

	return (
		<DiscoverLayout layoutRef={layout}>
			<SearchResults
				key={search}
				initial={keywordChange ? [] : initial}
				spaces={spaces}
			/>
		</DiscoverLayout>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [],
		fallback: true
	}
}

export const getStaticProps: GetStaticProps<DiscoverProps> = async (
	context
) => {
	let { keyword } = context.params as {
		keyword: string
	}

	let stories = await getPreviews({
		keyword
	})

	return {
		props: {
			stories: stories.data?.searchHentai.data ?? []
		},
		revalidate: 3600 * 3
	}
}

export default Search
