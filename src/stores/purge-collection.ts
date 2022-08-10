import { writable } from "svelte/store"

export default writable<Set<number>>(new Set())
