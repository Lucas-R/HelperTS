import useDate from "./hooks/useDate";

function main() {
    const { today, format } = useDate();

    console.log(today());
    console.log(format({date: new Date(2025, 11, 4)}));
}

main();