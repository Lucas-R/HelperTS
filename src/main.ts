import useDom from "./hooks/useDom";
import useValidate from "./hooks/useValidate";

function main() {
    const form = useDom("#form");
    const { validate } = useValidate("#form");

    form.on("submit", (e) => {
        e.preventDefault();

        validate({
            classError: "error",
            classValid: "valid",
            callback: (e) => {
                console.log(e)
            }
        });
    });
}

main();