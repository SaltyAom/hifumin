import { writable, derived } from 'svelte/store'
import { browser } from '$app/environment'

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
    preference: {
        enable: boolean
        data: string[]
    }
    filter: {
        enable: boolean
        data: string[]
    }
    safeMode: SafeMode
}

const defaultSetting: Setting = {
    theme: Theme.adaptive,
    reader: ReaderType.scroll,
    saveHistory: true,
    preference: {
        enable: false,
        data: []
    },
    filter: {
        enable: false,
        data: []
    },
    safeMode: SafeMode.off
}

const setting = writable<Setting>(
    !browser
        ? defaultSetting
        : JSON.parse(localStorage.getItem('setting')) || defaultSetting
)

setting.subscribe((setting) => {
    if (!browser) return

    localStorage.setItem('setting', JSON.stringify(setting))
})

const adaptiveDarkTheme = writable(false)

adaptiveDarkTheme.subscribe(() => {
    if (!browser) return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    adaptiveDarkTheme.set(mediaQuery.matches)

    mediaQuery.addEventListener('change', ({ matches }) => {
        adaptiveDarkTheme.set(matches)
    })
})

export const darkTheme = derived(
    [setting, adaptiveDarkTheme],
    ([settings, adaptive]) => {
        if (settings.theme === Theme.dark) return true
        if (settings.theme === Theme.light) return false

        return adaptive
    }
)

export default setting
