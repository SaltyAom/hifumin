import { FormEvent, FunctionComponent, ReactElement } from "react"

export interface InputProps {
    children?: ReactElement
    value: string
    placeholder?: string
    onChange?: <T = HTMLElement>(event: FormEvent<T>) => void
    enterKeyHint?: string
}

export type InputComponent = FunctionComponent<InputProps>
