// @ts-nocheck
import Document, { Html, Head, Main, NextScript } from 'next/document'

const clarity = `(function(c,l,a,r,i,t,y){
	c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
	t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
	y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "3vmuanjtw5");`

class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
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
						href={`/assets/app/icon/apple-icon.jpg`}
					/>
					<meta
						name="apple-mobile-web-app-status-bar-style"
						content="default"
					/>
					<meta name="format-detection" content="telephone=no" />
					<meta name="apple-touch-fullscreen" content="yes" />
					<script type="text/javascript" dangerouslySetInnerHTML={{
						__html: process.env.NODE_ENV === "production" ? clarity : ''
					}} />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument
