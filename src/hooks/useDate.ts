import type { UseDateProps } from "@/types/UseDateProps";

export default function useDate() {
    function today({ locale = "pt-BR", payload }: UseDateProps = {}) {
        let options = payload ?? { day: "2-digit", month: "2-digit", year: "2-digit" };

        return new Date().toLocaleDateString(locale, options)
    }

    function format({ date, locale = "pt-BR", payload }: UseDateProps = {}): string {
        if (!date) throw new Error(`invalid date: ${date}`);

        const options: Intl.DateTimeFormatOptions = payload ?? {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
        };

        return date.toLocaleDateString(locale, options);
    }

    return { today, format }
}