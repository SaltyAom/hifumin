import { memo } from 'react'

import Link from 'next/link'

import Page from '@components/page'

import { BookComponent, BookProps } from './types'

import { Story } from '@types'

import styles from './book.module.sass'

const shouldRender = (prevProps: BookProps, nextProps: BookProps) =>
	(prevProps.preload || prevProps.story?.id) ===
	(nextProps.preload || nextProps.story?.id)

const Book: BookComponent = memo(({ story = {}, preload = false }) => {
	if (preload)
		return (
			// eslint-disable-next-line jsx-a11y/anchor-is-valid
			<Link href="">
				{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
				<a className={styles.book}>
					<Page preload={true} page={undefined} alt="Read">
						<div className={styles.detail}>
							{/* eslint-disable-next-line jsx-a11y/heading-has-content */}
							<h6 className={styles.title} />
							<div className={styles.row}>
								<img
									className={styles.icon}
									src="/icons/language.svg"
									alt="Language"
								/>
								<p className={styles.content} />
							</div>
							<div className={styles.row}>
								<div className={styles.detail}>
									<img
										className={styles.icon}
										src="/icons/book.svg"
										alt="Language"
									/>
									<p className={styles.content} />
								</div>
								<div className={styles.detail}>
									<img
										className={styles.icon}
										src="/icons/heart.svg"
										alt="Language"
									/>
									<p className={styles.content} />
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
			<a className={styles.book}>
				<Page page={cover} alt={`Read ${display}`}>
					<div className={styles.detail}>
						<h6 className={styles.title}>{display}</h6>
						<div className={styles.row}>
							<img
								className={styles.icon}
								src="/icons/language.svg"
								alt="Language"
							/>
							<p className={styles.content}>{language}</p>
						</div>
						<div className={styles.row}>
							<div className={styles.detail}>
								<img
									className={styles.icon}
									src="/icons/book.svg"
									alt="Language"
								/>
								<p className={styles.content}>{amount}</p>
							</div>
							<div className={styles.detail}>
								<img
									className={styles.icon}
									src="/icons/heart.svg"
									alt="Language"
								/>
								<p className={styles.content}>{favorite}</p>
							</div>
						</div>
					</div>
				</Page>
			</a>
		</Link>
	)
}, shouldRender)

export default Book
