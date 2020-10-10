import { ChevronUp } from '@icons'

import './fab.styl'

const FloatingActionButton = () => {
    const backToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

	return (
		<button id="fab" aria-label="Back to Top" onClick={backToTop}>
			<ChevronUp />
		</button>
	)
}

export default FloatingActionButton
