import SettingsLayout, {
	MenuDetail,
	MenuLayout,
	ExternalLink
} from '@layouts/settings'

import { ChevronRight } from '@icons'

const Support = () => {
	return (
		<SettingsLayout title="Support">
			<MenuLayout title="Support">
				<MenuDetail>
					Opener is completly free to use, you can support Opener by
					continue to using the platform or if you really want, you
					can{' '}
					<ExternalLink href="https://ko-fi.com/saltyaom">
						buy me some Ko-fi
					</ExternalLink>
					.
				</MenuDetail>
				<ExternalLink href="https://ko-fi.com/saltyaom">
					Buy me some Ko-fi
					<ChevronRight />
				</ExternalLink>
			</MenuLayout>
		</SettingsLayout>
	)
}

export default Support
