import { FunctionComponent, useEffect, useReducer, useState } from 'react'

import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'

import type { OperationResult } from 'urql'

import { useAtom } from 'jotai'
import { collectHistoryAtom } from '@stores/settings'
import { HistoryActions, historyAtom } from '@stores/history'

import ReaderLayout from '@layouts/reader'

import { Page, ProgressIndicator, OpenGraph, StoryError } from '@atoms'

import tw from '@tailwind'
import { getHentaiReaderById, HentaiQuery } from '@services/graphql'
import type { GetHentaiById, GetHentaiByIdVariables } from '@services/graphql'

import type { Story } from '@types'

interface ReaderProps {
	story: HentaiQuery<Story> | null
	error:
		| OperationResult<GetHentaiById, GetHentaiByIdVariables>['error']
		| undefined
}

const Reader: FunctionComponent<ReaderProps> = ({
	story: initialStory,
	error = null
}) => {
	let [collectHistory] = useAtom(collectHistoryAtom)
	let [, dispatchHistory] = useAtom(historyAtom)

	let {
		query: { id }
	} = useRouter()

	let [story, updateClientStory] = useState(initialStory)
	let [isRetried, updateRetried] = useReducer(() => true, false)

	useEffect(() => {
		updateClientStory(initialStory)
	}, [initialStory])

	useEffect(() => {
		if (typeof story === 'undefined') return
		if (!story || !story.success) return

		if (collectHistory)
			dispatchHistory({
				type: HistoryActions.add,
				story: story.data
			})
	}, [story])

	useEffect(() => {
		// eslint-disable-next-line no-console
		if (isRetried || !error) return
		if (!id) return updateRetried()

		// ? Stop if page change, preventing memory leak
		let controller = new AbortController()
		let done = false

		let retry = async () => {
			let clientStory: HentaiQuery<Story> | null = await fetch(
				`/api/story/${id}`,
				{
					signal: controller.signal
				}
			).then((s) => s.json())

			done = true

			if (clientStory) updateClientStory(clientStory)
			else updateRetried()
		}

		retry()

		return () => {
			if (!done) controller.abort()
		}
	}, [error])

	if (typeof story === 'undefined')
		return (
			<>
				<OpenGraph title="Opener Studio" />
				<ReaderLayout isValid={false}>
					<section
						className={tw`absolute top-0 left-0 flex justify-center items-center w-full h-screen`}
					>
						<ProgressIndicator />
					</section>
				</ReaderLayout>
			</>
		)

	if (error || !story?.success)
		return (
			<ReaderLayout isValid={false}>
				<section className={tw`flex justify-center h-full-app`}>
					<StoryError error={error?.message || ''} />
				</section>
			</ReaderLayout>
		)

	let {
		data: {
			title: { display },
			images: { pages }
		}
	} = story

	return (
		<>
			<OpenGraph title={`${display} - Opener Studio`} />
			<ReaderLayout isValid story={story.data}>
				{pages.map((page) => (
					<Page key={page.link} page={page} />
				))}
			</ReaderLayout>
		</>
	)
}

export const getStaticPaths: GetStaticPaths = async () => ({
	paths: [],
	fallback: true
})

interface Path {
	params: {
		id: string
	}
}

export const getStaticProps: GetStaticProps<ReaderProps> = async (context) => {
	let {
		params: { id }
	} = context as Path

	let story = await getHentaiReaderById({ id: +id })

	return {
		props: {
			story: story.data?.getHentaiById || null,
			error: JSON.parse(
				JSON.stringify(story.error, (_, v) =>
					typeof v === 'undefined' ? null : v
				)
			)
		},
		revalidate: story.data?.getHentaiById.success || false ? 3600 : 300
	}
}

export default Reader
