import { writable } from 'svelte/store'

export interface User {
    name: string
}

export const isAuthed = writable(false)
const user = writable<User | null>()

export default user
