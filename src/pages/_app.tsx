import { Fragment, useEffect } from "react"

import Head from "next/head"
import { AppProps } from "next/app"

import "@styles/init.styl"

const App = ({ Component, pageProps }: AppProps) => {
	useEffect(() => {
		document.addEventListener("touchstart", () => null, false)

		if (
			"serviceWorker" in navigator &&
			process.env.NODE_ENV === "production"
		) {
			navigator.serviceWorker
				.register("/service-worker.js", {
					scope: "/"
				})
				.then((registration) => console.log(registration))
				.catch((err) => {
					console.log("Err")
				})
		}
	}, [])

	return (
		<Fragment>
			<Head>
				<meta
					name="referrer"
					content="same-origin"
					data-react-helmet="true"
				/>
			</Head>
			<Component {...pageProps} />
		</Fragment>
	)
}

export default App
