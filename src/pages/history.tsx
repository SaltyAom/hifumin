import { useAtom } from 'jotai'
import { historyAtom } from '@stores/history'
import { knownStoriesAtom } from '@stores/known-story'

import OpenGraph from '@atoms/opengraph'

import dayjs from 'dayjs'
import groupBy from 'lodash/groupBy'

import {
	VerticalLayout,
	VerticalGroup,
	VerticalGallery,
	VerticalCover
} from '@layouts/vertical-preview'

const History = () => {
	let [histories] = useAtom(historyAtom)
	let [knownStories] = useAtom(knownStoriesAtom)

	let historyGroup = groupBy(
		histories.map((history) => ({
			...history,
			time: dayjs(history.time).format('D MMM YY')
		})),
		'time'
	)

	return (
		<>
			<OpenGraph title="History - Opener Studio" />
			<VerticalLayout title="History">
				{Object.keys(historyGroup).map((day) => (
					<VerticalGroup key={day} title={day}>
						<VerticalGallery>
							{historyGroup[day].map((history) => (
								<VerticalCover
									key={history.time}
									story={knownStories[history.id]}
								/>
							))}
						</VerticalGallery>
					</VerticalGroup>
				))}
			</VerticalLayout>
		</>
	)
}

export default History
