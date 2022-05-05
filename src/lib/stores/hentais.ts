import { writable } from "svelte/store"

import type { NhqlSearchData } from "$lib/gql/nhqlSearch"

export default writable<NhqlSearchData[]>([])
