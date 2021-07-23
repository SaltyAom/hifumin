import { SafeMode } from "@stores/settings"

import tw from '@tailwind'

export const imageEffect: Record<SafeMode, string> = {
	[SafeMode.disabled]: '',
	[SafeMode.blur]: '',
	[SafeMode.opaque]: tw`opacity-0`
}
