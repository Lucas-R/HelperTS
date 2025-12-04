export type ErrorsProps = {
    field: string,
    message: string
}

export interface ValidateProps {
    classError?: string,
    classValid?: string,
    callback?: (arg: any) => void
}

export interface ValidateReturnProps {
    valid: boolean,
    errors: ErrorsProps[]
}

export type InputsProps = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
