/* eslint-disable react/no-danger */
import Document, { Html, Head, Main, NextScript } from 'next/document'

import { languageCode } from '@services/constants'

import OpenGraph from '@components/atoms/opengraph'
import { isProduction } from '@services/validation'

const clarity = `(function(c,l,a,r,i,t,y){
	c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
	t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
	y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "7fjx600p7z");`
const gtag = 'G-C3H8XJHXG1'

class OpenerDocument extends Document {
	render() {
		return (
			<Html lang={languageCode}>
				<Head>
					<OpenGraph />
					<meta name="referrer" content="same-origin" />

					{isProduction ? (
						<>
							<script
								type="text/javascript"
								dangerouslySetInnerHTML={{
									__html: clarity
								}}
							/>

							<script
								async
								src={`https://www.googletagmanager.com/gtag/js?id=${gtag}`}
							/>
							<script
								dangerouslySetInnerHTML={{
									__html: `function gtag(){dataLayer.push(arguments)}window.dataLayer=window.dataLayer||[],gtag("js",new Date),gtag("config","${gtag}",{page_path:window.location.pathname});`
								}}
							/>
						</>
					) : null}

					<link rel="manifest" href="/assets/app/manifest.json" />
					<meta name="mobile-web-app-capable" content="yes" />

					<meta name="application-name" content="Opener Studio" />
					<meta name="mssmarttagspreventparsing" content="true" />
					<meta
						name="msapplication-window"
						content="width=1366;height=768"
					/>

					<meta name="apple-mobile-web-app-capable" content="yes" />
					<meta name="apple-mobile-web-app-title" content="Opener" />
					<link
						rel="apple-touch-icon"
						href="/assets/app/icon/apple-icon.jpg"
					/>
					<meta
						name="apple-mobile-web-app-status-bar-style"
						content="default"
					/>
					<meta name="format-detection" content="telephone=no" />
					<meta name="apple-touch-fullscreen" content="yes" />
				</Head>
				<body id="body">
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default OpenerDocument
