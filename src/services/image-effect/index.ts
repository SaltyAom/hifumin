import { SafeMode } from "@stores/settings"

import tw from '@tailwind'

import styles from './image-effect.module.sass'

export const imageEffect: Record<SafeMode, string> = {
	[SafeMode.disabled]: '',
	[SafeMode.blur]: styles.blur,
	[SafeMode.opaque]: tw`opacity-0`
}
