import { writable } from 'svelte/store'

export type ReaderType = 'scroll' | 'click'

export interface Controller {
    type: ReaderType
}

const controller = writable<Controller>({
    type: 'scroll'
})

export default controller
