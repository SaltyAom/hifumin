import { writable } from "svelte/store"

import type { NhqlSearchData } from "@gql/nhqlSearch"

export default writable<NhqlSearchData[]>([])
