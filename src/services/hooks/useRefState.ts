import { useCallback, useState } from 'react'

// eslint-disable-next-line no-unused-vars
const useRefState = <T = HTMLElement>(): [T | null, (element: T) => void] => {
	let [refState, updateRefState] = useState<T | null>(null)

	let updateRef = useCallback((element: T) => {
		updateRefState(element)
	}, [])

	return [refState, updateRef]
}

export default useRefState
