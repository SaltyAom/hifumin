import styles from './loader.module.sass'

const Loader = () => (
    <div className={styles.loader}>
        <svg className={styles.circular} viewBox="25 25 50 50">
            <circle
                className={styles.path}
                cx="50"
                cy="50"
                r="20"
                fill="none"
                strokeWidth="4"
                strokeMiterlimit="10"
            />
        </svg>
    </div>
)

export default Loader