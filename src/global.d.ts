/// <reference types="@sveltejs/kit" />

declare namespace svelte.JSX {
    interface HTMLAttributes<T> {
        onintersect?: () => void
    }
}
