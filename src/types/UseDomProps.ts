type EventMap = {
    [K in keyof HTMLElementEventMap]?: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any;
};

export interface UseDomProps<T extends HTMLElement> {
    current: T | null,
    set: (selector: string | T) => void,
    on: <K extends keyof HTMLElementEventMap>(type: K, handler: EventMap[K]) => void;
    off: <K extends keyof HTMLElementEventMap>(type: K, handler: EventMap[K]) => void;
}