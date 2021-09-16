import { atom } from "jotai"

import type { Stories } from "@types"

export const persistedDiscoveredAtom = atom<Stories>([])