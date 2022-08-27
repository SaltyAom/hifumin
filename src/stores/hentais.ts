import { writable } from 'svelte/store'

import type { Cover } from '@gql'

export default writable<Cover[]>([])
