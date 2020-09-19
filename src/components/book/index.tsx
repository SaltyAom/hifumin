import { memo } from 'react'

import Link from 'next/link'

import Page from '@components/page'

import { BookComponent, BookProps } from './types'

import './book.styl'

const shouldRender = (prevProps: BookProps, nextProps: BookProps) =>
	(prevProps.preload || prevProps.story.id) ===
	(nextProps.preload || nextProps.story.id)

const Book: BookComponent = memo(({ story = {}, preload = false }) => {
	if (preload)
		return (
			<Link href="">
				<a className="book -preload">
					<Page preload alt="Read">
						<div className="detail">
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
	} = story

	return (
		<Link href={`/h/${id}`}>
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
