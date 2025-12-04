import type { UseDomProps } from "@/types/UseDomProps";

export default function useDom<T extends HTMLElement>(selector: string): UseDomProps<T> {
    const ref: UseDomProps<T> = {
        current: null,

        set(selector: string | T) {
            if(typeof selector === "string") {
                const element = document.querySelector<T>(selector);
    
                if(!element) throw new Error(`${selector} not found.`);
    
                this.current = element;
            } else {
                this.current = selector;
            }
        },

        on(type, handler) {
            if(!this.current) return;
            this.current.addEventListener(type, handler as EventListener);
        },

        off(type, handler) {
            if(!this.current) return;
            this.current.removeEventListener(type, handler as EventListener);
        }
    }

    if(selector) ref.set(selector);

    return ref;
}