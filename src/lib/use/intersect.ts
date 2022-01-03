/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const intersect = (
    node: HTMLElement,
    {
        loop = false,
        // Awaitable 
        onIntersect = null
    }: {
        loop?: boolean
        onIntersect?: () => void | Promise<void>
    } = {
        loop: false,
        onIntersect: null
    }
) => {
    let intentIntersection: number | null
    let init = true

    const checkIntersection = async () => {
        if (onIntersect) await onIntersect()
        else node.dispatchEvent(new CustomEvent('intersect'))

        clearTimeout(intentIntersection)
        intentIntersection = null

        if (!loop)
            return window.removeEventListener(
                'scroll',
                handleIntersection,
                true
            )

        handleIntersection()
    }

    const handleIntersection = () => {
        if (node.getBoundingClientRect().top - window.innerHeight > 0) {
            if (intentIntersection) {
                clearTimeout(intentIntersection)
                intentIntersection = null
            }

            return
        }

        if (intentIntersection) return

        intentIntersection = setTimeout(
            checkIntersection,
            init ? 0 : 75
        ) as unknown as number

        if (!init) init = true
    }

    window.addEventListener('scroll', handleIntersection, true)
    requestAnimationFrame(handleIntersection)

    return {
        destroy() {
            loop = false
            window.removeEventListener('scroll', handleIntersection, true)
        }
    }
}

export default intersect
