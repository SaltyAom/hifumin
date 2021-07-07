import type { FunctionComponent, FormEventHandler, ReactChild, RefObject } from 'react'

export interface TextBoxProps {
	className?: string
	name: string
	placeholder: string
	onChange?: FormEventHandler
	suffix?: ReactChild
    inputRef?: RefObject<HTMLInputElement>
}

export type TextBoxComponent = FunctionComponent<TextBoxProps>
