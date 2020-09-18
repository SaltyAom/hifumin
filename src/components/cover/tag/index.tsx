import Link from "next/link"

import TagContainer from "./container"

import "./tag.styl"

const Tag = ({ children = null, href = "", preload = false, style = {} }) => (
	<Link href={href}>
		<a
			aria-disabled={preload}
			className={`tag ${preload ? "-preload" : ""}`}
			style={style}
		>
			{children}
		</a>
	</Link>
)

export { TagContainer }
export default Tag
