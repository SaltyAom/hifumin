import Landing from '@pages/index'

import { render } from '@testing-library/react'

describe('App', () => {
    it('renders without crashing', () => {
        const { baseElement } = render(<Landing />)

        expect(baseElement).toBeTruthy()
    })
})
