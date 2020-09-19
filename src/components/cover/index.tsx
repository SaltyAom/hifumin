import { memo } from 'react'

import Tag, { TagContainer } from './tag'

import { randomBetween } from '@libs/random'

import { CoverComponent, CoverProps } from './types'

import './cover.styl'
import { Story } from '@types'
import useSimulateHeight from '@libs/hooks/simulateHeight'

const shouldRender = (prev: CoverProps, next: CoverProps) => {
	return (
		`${prev.preload}-${prev.story ? prev.story.id : 0}` ===
		`${next.preload}-${next.story ? next.story.id : 0}`
	)
}

const Cover: CoverComponent = memo(
	({
		story = {
			images: {
				cover: {
					info: {
						width: 0,
						height: 0
					}
				}
			}
		},
		preload = false
	}) => {
		let {
			images: {
				cover: {
					info: { width, height }
				}
			}
		} = story

		let [
			simulatedImageHeight,
			{ element, stopSimulateImageHeight }
		] = useSimulateHeight({
			width,
			height,
			preload
		})

		if (preload)
			return (
				<header id="cover" className="-preload">
					<div className="cover">
						<div className="page">
							<img className="paper -preload" />
						</div>
					</div>
					<section className="detail">
						<h3 className="code" />
						<h1 className="title" />
						<p className="sub-title" />
						<section className="info">
							<h5
								className="content"
								style={{ width: `${randomBetween(70, 120)}px` }}
							/>
							<h5
								className="content"
								style={{ width: `${randomBetween(70, 120)}px` }}
							/>
						</section>
						<TagContainer>
							<span>Language: </span>
							<Tag
								preload
								style={{
									transform: 'translateY(10px)',
									width: `${randomBetween(90, 180)}px`
								}}
							/>
						</TagContainer>
						<TagContainer>
							<span>Artist: </span>
							<Tag
								preload
								style={{
									transform: 'translateY(10px)',
									width: `${randomBetween(90, 180)}px`
								}}
							/>
						</TagContainer>
						<TagContainer>
							{Array(randomBetween(8, 16))
								.fill(0)
								.map((_, index) => (
									<Tag
										key={index}
										preload
										style={{
											width: `${randomBetween(30, 210)}px`
										}}
									/>
								))}
						</TagContainer>
					</section>
				</header>
			)

		let { id, title, images, info, metadata } = story as Story,
			{ cover } = images,
			{ amount, favorite } = info,
			{ tags, language, artist } = metadata

		return (
			<header id="cover">
				<div className="cover">
					<div className="page">
						<img
							src={cover.link}
							ref={element}
							className="paper"
							alt={title.display}
							style={{
								height: simulatedImageHeight
							}}
							onLoad={stopSimulateImageHeight}
						/>
					</div>
				</div>
				<section className="detail">
					<h3 className="code">{id}</h3>
					<h1 className="title">{title.display}</h1>
					<p className="sub-title">{title.japanese}</p>
					<section className="info">
						<h5 className="content">
							{amount.toLocaleString()} Page
						</h5>
						<h5 className="content">
							{favorite.toLocaleString()} Favorite
						</h5>
					</section>
					<TagContainer>
						<span>Language: </span>
						<Tag href={`/language/${language}`}>{language}</Tag>
					</TagContainer>
					<TagContainer>
						<span>Artist: </span>
						<Tag href={`/artist/${language}`}>{artist.name}</Tag>
					</TagContainer>
					<TagContainer>
						{tags.map(({ name }) => (
							<Tag key={name} href={`/tag/${name}`}>
								{name}
							</Tag>
						))}
					</TagContainer>
				</section>
			</header>
		)
	},
	shouldRender
)

export default Cover
