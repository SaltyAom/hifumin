const intersect = (
    node: HTMLElement,
    {
        loop = false
    }: {
        loop: boolean
    } = {
        loop: false
    }
) => {
    let intentIntersection: number | null

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    if (intentIntersection) {
                        clearTimeout(intentIntersection)
                        intentIntersection = null
                    }

                    return
                }

                if (intentIntersection) return

                intentIntersection = setTimeout(() => {
                    node.dispatchEvent(new CustomEvent('intersect'))

                    if (!loop) observer.disconnect()
                }, 75) as unknown as number
            })
        },
        {
            rootMargin: window.innerHeight * 0.75 + 'px'
        }
    )

    observer.observe(node)

    return {
        destroy() {
            observer.disconnect()
        }
    }
}

export default intersect
