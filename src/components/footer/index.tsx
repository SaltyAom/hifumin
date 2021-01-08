import Link from 'next/link'

import Section from './section'

import './footer.sass'

const Footer = () => (
	<div id="app-footer">
		<footer className="wrapper">
			<section className="row">
				<Section>
					<h3 className="title">Services</h3>
					<Link href="/">
						<a className="link">Search</a>
					</Link>
					<Link href="/preference">
						<a className="link">Preference</a>
					</Link>
					<Link href="/settings">
						<a className="link">Settings</a>
					</Link>
				</Section>
				<Section>
					<h3 className="title">Terms and Usage</h3>
					<Link href="/about">
						<a className="link">About</a>
					</Link>
					<Link href="/about#terms">
						<a className="link">Terms and Service</a>
					</Link>
					<Link href="/about#privacy">
						<a className="link">Privacy</a>
					</Link>
					<Link href="/about#api">
						<a className="link">API</a>
					</Link>
				</Section>
				<Section>
					<h3 className="title">Support</h3>
					<Link href="/support">
						<a className="link">Support</a>
					</Link>
					<h3 className="title">Contact</h3>
					<a
						className="link"
						href="mailto:contact@opener.studio"
						target="_blank"
						rel="norefferer noreopener"
					>
						contact@opener.studio
					</a>
				</Section>
			</section>
			<section className="row">
				Copyright &copy; 2020 SaltyAom. All right reserved.
			</section>
		</footer>
	</div>
)

export default Footer
