import { FunctionComponent, ReactChild, ReactChildren } from "react"

import styles from './menu.module.sass'

interface DetailProps {
	children: ReactChild[] | ReactChild
	className?: string
}

type DetailComponent = FunctionComponent<DetailProps>

const Detail: DetailComponent = ({ children, className = '' }) => (
	<p className={`${styles.detail} ${className}`}>{children}</p>
)

export default Detail
