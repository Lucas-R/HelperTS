export default function useSelect(selectID: string) {
    const current = document.querySelector<HTMLSelectElement>(selectID);
    if(!current) throw new Error(`selector: ${selectID} not found.`);

    function handle(selector: string, callback: (e: HTMLSelectElement) => void) {
        const select = document.querySelector<HTMLSelectElement>(selector);
        if(!select) throw new Error(`selector: ${selectID} not found.`);
        callback(select);
        return select;
    }

    return { current, handle };
}