import { isServer } from '$lib/utils'
import { writable } from 'svelte/store'

export enum Theme {
    'light',
    'dark',
    'adaptive'
}

export enum ReaderType {
    'scroll',
    'interactive'
}

export enum SafeMode {
    'off',
    'blur',
    'opaque'
}

export interface Setting {
    theme: Theme
    reader: ReaderType
    saveHistory: boolean
    preference: string[]
    filter: string[]
    safeMode: SafeMode
}

const defaultSetting: Setting = {
    theme: Theme.adaptive,
    reader: ReaderType.scroll,
    saveHistory: true,
    preference: [],
    filter: [],
    safeMode: SafeMode.off
}

const setting = writable<Setting>(
    isServer
        ? defaultSetting
        : JSON.parse(localStorage.getItem('setting')) || defaultSetting
)

setting.subscribe((setting) => {
    if (!isServer) localStorage.setItem('setting', JSON.stringify(setting))
})

export default setting
