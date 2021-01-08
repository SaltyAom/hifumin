import { useEffect, useCallback, useState } from 'react'

import { supportsShare } from '@services'

import { LinkIcon, ShareIcon } from './icons'

import { ShareComponent } from './types'

import './share.sass'

const Share: ShareComponent = ({ id = 0 }) => {
	let [supportNativeShare, updateSupportNativeShare] = useState(false)

	useEffect(() => {
		updateSupportNativeShare(supportsShare)
	}, [])

	let share = useCallback(() => {
		navigator.share({
			url: `https://opener.studio/h/${id}`
		})
	}, [id])

	return (
		<footer id="share">
			{supportNativeShare && (
				<button type="button" className="button" onClick={share}>
					<ShareIcon /> Share
				</button>
			)}
			<a
				title="Open original link"
				href={`https://nhentai.net/${id ? `/g/${id}` : ''}`}
				target="_blank"
				rel="noreferrer noopener"
				className="button"
			>
				<LinkIcon /> Original
			</a>
		</footer>
	)
}

export default Share
