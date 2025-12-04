import type { ErrorsProps, ValidateReturnProps, InputsProps, ValidateProps } from "@/types/UseValidateProps";

function removeClass(element: HTMLElement, classname?: string) {
    if(!classname) return;
    
    element.classList.remove(classname)
}

export default function useValidate<T extends HTMLElement>(selector: string) {
    const wrapper = document.querySelector<T>(selector);

    function validate(options?: ValidateProps): ValidateReturnProps {
        const errors: ErrorsProps[] = [];
        const fields = Array.from(wrapper?.querySelectorAll<InputsProps>('[data-validate="true"]') || []);

        if(!fields) throw new Error("Nenhum campo foi encontrado.");

        fields.forEach((field) => {
            const value = field.value.trim();

            removeClass(field, options?.classError);
            removeClass(field, options?.classValid);

            if(!value) {
                errors.push({ field: field.name || "unknown", message: "Campo obrigatório." });
                options?.classError && field.classList.add(options.classError);
                field.addEventListener("input", () => removeClass(field, options?.classError));
                return;
            }

            options?.classValid && field.classList.add(options.classValid);
        });

        const result = { valid: errors.length === 0, errors };

        if(options?.callback) options.callback(result);

        return result;
    }

    return { validate };
}