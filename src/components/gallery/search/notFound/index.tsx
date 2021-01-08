import styles from './not-found.module.sass'

const NotFound = () => (
	<main id={styles['hentai-not-found']}>
		<img className={styles.image} src="/illust/not_found.svg" alt="Not Found" />
		<h1 className={styles.title}>Not found</h1>
		<p className={styles.detail}>You can searching with other keywords!</p>
	</main>
)

export default NotFound
