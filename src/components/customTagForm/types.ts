import { FunctionComponent } from "react"

export interface CustomTagFormProps {
    onSubmit: (tag: string) => any
    placeholder?: string
}

export type CustomTagFormComponent = FunctionComponent<CustomTagFormProps>