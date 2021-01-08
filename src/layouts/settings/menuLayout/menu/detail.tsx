import { FunctionComponent, ReactChild } from "react"

interface DetailProps {
	children: ReactChild[] | ReactChild
	className?: string
}

type DetailComponent = FunctionComponent<DetailProps>

const Detail: DetailComponent = ({ children, className = '' }) => (
	<p className={`detail ${className}`}>{children}</p>
)

export default Detail
