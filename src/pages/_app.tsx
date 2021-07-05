import { useEffect } from 'react'

import type { NextWebVitalsMetric, AppProps } from 'next/app'

import { Provider as JotaiProvider } from 'jotai'

import BaseLayout from '@layouts/base'
import PersistanceProvider from '@layouts/persistance'

import '@styles/init.sass'

const App = ({ Component, pageProps }: AppProps) => {
	useEffect(() => {
		document.addEventListener('touchstart', () => null, {
			passive: true
		})
	}, [])

	return (
		<JotaiProvider>
			<PersistanceProvider>
				<BaseLayout>
					<Component {...pageProps} />
				</BaseLayout>
			</PersistanceProvider>
		</JotaiProvider>
	)
}

export function reportWebVitals({
	id,
	name,
	label,
	value
}: NextWebVitalsMetric) {
	// @ts-ignore
	window.gtag('event', name, {
		event_category:
			label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
		value: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
		event_label: id, // id unique to current page load
		non_interaction: true // avoids affecting bounce rate.
	})
}

export default App
