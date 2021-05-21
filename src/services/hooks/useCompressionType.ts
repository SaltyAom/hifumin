import { useNetworkStatus } from 'react-adaptive-hooks'

import { useAtom } from 'jotai'
import { CompressionType, imageCompressionAtom } from '@stores/settings'

export const useCompressionType = () => {
	let [imageCompression] = useAtom(imageCompressionAtom)

	let { effectiveConnectionType = '4g' } = useNetworkStatus()

	let isAdaptive = imageCompression === CompressionType.adaptive

	if (
		imageCompression === CompressionType.native ||
		(isAdaptive && effectiveConnectionType === '4g')
	)
		return CompressionType.native

	if (
		imageCompression === CompressionType.compact ||
		(isAdaptive && effectiveConnectionType === '3g')
	)
		return CompressionType.compact

	if (
		imageCompression === CompressionType.heavy ||
		(isAdaptive &&
			(effectiveConnectionType === '2g' ||
				effectiveConnectionType === 'slow-2g'))
	)
		return CompressionType.heavy

	return CompressionType.native
}
