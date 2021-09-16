import { atom } from 'jotai'

import type { SettingStructure } from '@layouts/settings/main/types'

export const searchKeywordAtom = atom('')
export const searchSettingAtom = atom<SettingStructure[]>([])
