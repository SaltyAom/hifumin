import { FunctionComponent } from 'react'

import { GetStaticPaths, GetStaticProps } from 'next'

import type { OperationResult } from 'urql'

import { Page } from '@atoms'

import { ReaderLayout } from '@layouts/reader'

import { query, getHentaiReaderById, HentaiQuery } from '@services/graphql'
import type { GetHentaiById, GetHentaiByIdVariables } from '@services/graphql'

import { Story } from '@types'

interface ReaderProps {
	story: HentaiQuery<Story> | undefined
	error:
		| OperationResult<GetHentaiById, GetHentaiByIdVariables>['error']
		| undefined
}

const Reader: FunctionComponent<ReaderProps> = ({ story, error }) => {
	// Generating
	if (typeof story === 'undefined')
		return <ReaderLayout isValid={false}>Loading</ReaderLayout>

	if (error || !story.success)
		return (
			<ReaderLayout isValid={false}>
				{JSON.stringify(error) || story.error.toString()}
			</ReaderLayout>
		)

	let {
		data: {
			images: { pages }
		}
	} = story

	return (
		<ReaderLayout isValid={true} story={story.data}>
			{pages.map((page) => (
				<Page key={page.link} page={page} />
			))}
		</ReaderLayout>
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

	let story = await query<GetHentaiById, GetHentaiByIdVariables>(
		getHentaiReaderById,
		{
			id: +id
		}
	).toPromise()

	return {
		props: {
			story: story.data?.getHentaiById,
			error: JSON.parse(
				JSON.stringify(story.error, (_, v) =>
					typeof v === 'undefined' ? null : v
				)
			)
		},
		revalidate: 3600
	}
}

export default Reader
