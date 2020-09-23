import { supportsShare } from '@libs'
import { useCallback, useEffect, useState } from 'react'

import { LinkIcon, ShareIcon } from './icons'

import './share.styl'

import { ShareComponent } from './types'

const Share: ShareComponent = ({ id = '', title, preload = false }) => {
	let [supportNativeShare, updateSupportNativeShare] = useState(false)

	useEffect(() => {
		updateSupportNativeShare(supportsShare)
	}, [])

	let share = useCallback(() => {
		navigator.share({
			title,
			url: `https://opener.saltyaom.com/h/${id}`
		})
	}, [id])

	return (
		<footer id="share">
			{supportNativeShare && (
				<button className="button" onClick={share}>
					<ShareIcon /> Share
				</button>
			)}
			<a
				title="Open original link"
				href={`https://nhentai.net/${id ? `/g/${id}` : ''}`}
				target="_blank"
				rel="noreffer noopener"
				className="button"
			>
				<LinkIcon /> Original
			</a>
		</footer>
	)
}

export default Share
