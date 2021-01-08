import { useEffect, useState, useRef } from 'react'

import { useStoreon } from 'storeon/react'
import { SearchEvent, SearchStore } from '@models'

import Link from 'next/link'

import Cover from '@components/cover'

import { fetch } from '@services'

import { Story } from '@types'

import './landing-cover.styl'

const LandingCover = () => {
	let { search } = useStoreon<SearchStore, SearchEvent>('search')

	let [story, updateStory] = useState<Story>(null)

	let previousFetch = useRef<AbortController>()

	useEffect(() => {
		updateStory(null)

		let controller = new AbortController(),
			{ signal } = controller

		if (previousFetch.current) previousFetch.current.abort()

		previousFetch.current = controller

		fetch(`https://nhapi.now.sh/${search.trim()}`, {
			signal
		}).then((story) => updateStory(story))
	}, [search])

	return (
		<Link href="/h/[h]" as={`/h/${search}`}>
			<a id="landing-cover">
				{story === null ? (
					<Cover preload={true} />
				) : (
					<Cover story={story} />
				)}
			</a>
		</Link>
	)
}

export default LandingCover
