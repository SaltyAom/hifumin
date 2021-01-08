import { useReducer, useState, useEffect, useRef, useCallback } from 'react'

import { Story } from '@types'

/**
 * @deprecated
 * ? Use Next Image instead
 */
const useLazyLoad = (story: Story | undefined) => {
	let [allowPage, increaseAllowPage] = useReducer(
			(allowPage) => allowPage + 20,
			20
		),
		[totalPage, updateTotalPage] = useState(20)

	let previousLazyLoad = useRef<() => void>()

	useEffect(() => {
		if (previousLazyLoad.current)
			document.removeEventListener('scroll', previousLazyLoad.current)

		if (allowPage < totalPage)
			document.addEventListener('scroll', lazyLoad, {
				passive: true
			})

		previousLazyLoad.current = lazyLoad
	}, [allowPage, totalPage])

	useEffect(() => {
		if (typeof story === 'undefined' || !story.id) return

		let {
			id,
			images: { pages }
		} = story

		if (id) updateTotalPage(pages.length)
	}, [story])

	let lazyLoad = useCallback(() => {
		let pageHeight = window.innerHeight

		if (
			totalPage <= allowPage ||
			document.body.scrollHeight >= window.pageYOffset + pageHeight * 2.5
		)
			return

		increaseAllowPage()
    }, [allowPage, increaseAllowPage, totalPage])
    
    return [allowPage]
}

export default useLazyLoad
