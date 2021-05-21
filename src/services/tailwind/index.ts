import styles from './tailwind.module.sass'

const tw = (classNames: string | TemplateStringsArray) => {
    let names = (typeof classNames === 'object'
        ? classNames[0]
        : classNames
    ).trim()

    return names
        .split(' ')
        .map((className) => styles[className])
        .join(' ')
}

export const combine = (...className: string[]) => className.join(" ")

export default tw
