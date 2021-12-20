const intersect = (node: HTMLElement) => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return

                node.dispatchEvent(new CustomEvent('intersect'))
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
