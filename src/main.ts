import select from "./hooks/useSelect";
import useDom from "./hooks/useDom";
import useValidate from "./hooks/useValidate";
import useSelect from "./hooks/useSelect";

function main() {
    const form = useDom("#form");
    const { validate } = useValidate("#form");

    const { current, handle } = useSelect("#select");

    handle("#select2", (select) => {
        current.addEventListener("change", (e) => {
            const target = e.target as HTMLSelectElement;
            
            select.value = "";
            select.classList.remove("error");

            if(target.value) {
                select.classList.remove("disabled");
                select.setAttribute("data-validate", "true");
            } else {
                select.classList.add("disabled");
                select.setAttribute("data-validate", "false");
            }
        });
    });

    form.on("submit", (e) => {
        e.preventDefault();

        validate({
            classError: "error",
            classValid: "valid"
        });
    });
}

main();