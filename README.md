# Nextjs Starter
Starter template for Nextjs production using:
- Preact
- TypeScript
- ESLint
- Dynamic Import
- Tailwind
- Stylus
- Testing
    - Jest
    - React Testing Library
- Github Action

## Path list
List of path aliased.
- `@pages` - src/pages
- `@layouts` - src/layouts
- `@components` - src/components
- `@styles` - src/styles
- `@services` - src/services
- `@models` - src/models

## Test
Test suite is set up with jest.
* __tests__ - Contains test file.
* __mocks__ - Mockup file like | (css|styl|.scss|.less) is set. (Can be changed at `jest.config.js`)

## Github Action
Run once pull requst is created. The following command in run:
* lint
* test
