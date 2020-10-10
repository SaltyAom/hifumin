import SettingsLayout, { MenuDetail, MenuLayout } from '@layouts/settings'

import { ChevronRight } from '@icons'

const Support = () => {
	return (
		<SettingsLayout title="Support">
			<MenuLayout title="Support">
				<MenuDetail>
					Opener is completly free to use, you can support Opener by continue
					to using the platform or if you really want, you can{' '}
					<a
						className="link"
						href="https://ko-fi.com/saltyaom"
						target="_blank"
						rel="norefferer noreopener"
					>
						buy me some Ko-fi
					</a>
					.
				</MenuDetail>
				<a
					className="menu -link"
					href="https://ko-fi.com/saltyaom"
					target="_blank"
					rel="noreopener norefferer"
				>
					Buy me some Ko-fi
					<ChevronRight />
				</a>
			</MenuLayout>
		</SettingsLayout>
	)
}

export default Support
