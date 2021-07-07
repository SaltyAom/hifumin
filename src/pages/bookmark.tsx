import { useAtom } from 'jotai'
import { bookmarkAtom } from '@stores/bookmark'
import { knownStoriesAtom } from '@stores/known-story'

import {
	VerticalLayout,
	VerticalGallery,
	VerticalCover,
	VerticalGroup
} from '@layouts/vertical-preview'

import OpenGraph from '@atoms/opengraph'

const Bookmark = () => {
	let [bookmarks] = useAtom(bookmarkAtom)
	let [knownStories] = useAtom(knownStoriesAtom)

	return (
		<>
			<OpenGraph title="Bookmark - Opener Studio" />
			<VerticalLayout title="Bookmark">
				<VerticalGroup
					title={`${bookmarks.length.toLocaleString()} favorite${
						bookmarks.length > 1 ? 's' : ''
					}`}
				>
					<VerticalGallery>
						{bookmarks.map((bookmark) => (
							<VerticalCover
								key={bookmark}
								story={knownStories[bookmark]}
							/>
						))}
					</VerticalGallery>
				</VerticalGroup>
			</VerticalLayout>
		</>
	)
}

export default Bookmark
