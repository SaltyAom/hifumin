import { useEffect, useState } from 'react'

const useWindowSize = () => {
	let [size, updateSize] = useState([0, 0])

	useEffect(() => {
		let onResize = () => updateSize([window.innerWidth, window.innerHeight])

		onResize()
		window.addEventListener('resize', onResize, {
			passive: true
		})

		return () => {
			window.removeEventListener('resize', onResize)
		}
	}, [])

    return [size[0], size[1]]
}

export default useWindowSize