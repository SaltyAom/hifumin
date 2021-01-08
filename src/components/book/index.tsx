import { memo } from 'react'

import Link from 'next/link'

import Page from '@components/page'

import { BookComponent, BookProps } from './types'

import { Story } from '@types'

import './book.sass'

const shouldRender = (prevProps: BookProps, nextProps: BookProps) =>
	(prevProps.preload || prevProps.story?.id) ===
	(nextProps.preload || nextProps.story?.id)

const Book: BookComponent = memo(({ story = {}, preload = false }) => {
	if (preload)
		return (
			// eslint-disable-next-line jsx-a11y/anchor-is-valid
			<Link href="">
				{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
				<a className="book -preload">
					<Page preload={true} page={undefined} alt="Read">
						<div className="detail">
							{/* eslint-disable-next-line jsx-a11y/heading-has-content */}
							<h6 className="title" />
							<div className="row">
								<img
									className="icon"
									src="/icons/language.svg"
									alt="Language"
								/>
								<p className="content" />
							</div>
							<div className="row">
								<div className="detail">
									<img
										className="icon"
										src="/icons/book.svg"
										alt="Language"
									/>
									<p className="content" />
								</div>
								<div className="detail">
									<img
										className="icon"
										src="/icons/heart.svg"
										alt="Language"
									/>
									<p className="content" />
								</div>
							</div>
						</div>
					</Page>
				</a>
			</Link>
		)

	let {
		id,
		title: { display },
		images: { cover },
		info: { amount, favorite },
		metadata: { language }
	} = story as Story

	return (
		<Link href="/h/[h]" as={`/h/${id}`}>
			<a className="book">
				<Page page={cover} alt={`Read ${display}`}>
					<div className="detail">
						<h6 className="title">{display}</h6>
						<div className="row">
							<img
								className="icon"
								src="/icons/language.svg"
								alt="Language"
							/>
							<p className="content">{language}</p>
						</div>
						<div className="row">
							<div className="detail">
								<img
									className="icon"
									src="/icons/book.svg"
									alt="Language"
								/>
								<p className="content">{amount}</p>
							</div>
							<div className="detail">
								<img
									className="icon"
									src="/icons/heart.svg"
									alt="Language"
								/>
								<p className="content">{favorite}</p>
							</div>
						</div>
					</div>
				</Page>
			</a>
		</Link>
	)
}, shouldRender)

export default Book
