import Link from 'next/link'

import Section from './section'

import styles from './footer.module.sass'

const Footer = () => (
	<div id={styles['app-footer']}>
		<footer className={styles.wrapper}>
			<section className={styles.row}>
				<Section>
					<h3 className={styles.title}>Services</h3>
					<Link href="/">
						<a className={styles.link}>Search</a>
					</Link>
					<Link href="/preference">
						<a className={styles.link}>Preference</a>
					</Link>
					<Link href="/settings">
						<a className={styles.link}>Settings</a>
					</Link>
				</Section>
				<Section>
					<h3 className={styles.title}>Terms and Usage</h3>
					<Link href="/about">
						<a className={styles.link}>About</a>
					</Link>
					<Link href="/about#terms">
						<a className={styles.link}>Terms and Service</a>
					</Link>
					<Link href="/about#privacy">
						<a className={styles.link}>Privacy</a>
					</Link>
					<Link href="/about#api">
						<a className={styles.link}>API</a>
					</Link>
				</Section>
				<Section>
					<h3 className={styles.title}>Support</h3>
					<Link href="/support">
						<a className={styles.link}>Support</a>
					</Link>
					<h3 className={styles.title}>Contact</h3>
					<a
						className={styles.link}
						href="mailto:contact@opener.studio"
						target="_blank"
						rel="norefferer noreopener"
					>
						contact@opener.studio
					</a>
				</Section>
			</section>
			<section className={styles.row}>
				Copyright &copy; 2020 SaltyAom. All right reserved.
			</section>
		</footer>
	</div>
)

export default Footer
