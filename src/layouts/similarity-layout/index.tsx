import type { FunctionComponent } from 'react'

import tw, { combine } from '@tailwind'

import styles from './similarity-layout.module.sass'

const SimliarityLayout: FunctionComponent = ({ children }) => {
	return (
		<main className={combine(tw`grid gap-8 p-8`, styles.layout)}>
			{children}
		</main>
	)
}

export default SimliarityLayout
