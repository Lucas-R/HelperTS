import type { RouteListener } from "@/types/UseRouterProps";

export default function useRouter() {
    let current = window.location.pathname;
    const listeners = new Set<RouteListener>();

    function notify(path: string) {
        listeners.forEach((listener) => listener(path));
    }

    function push(path: string) {
        window.history.pushState({}, "", path);

        current = path;

        notify(current);
    }

    function replace(path: string) {
        if(path === current) return;

        window.history.replaceState({}, "", path);

        current = path;

        notify(current);
    }

    function onChange(listener: RouteListener) {
        listeners.add(listener);

        return () => listeners.delete(listener);
    }

    window.addEventListener("popstate", () => {
        current = window.location.pathname;

        notify(current);
    });

    return {
        get path() {
            return current;
        },
        push,
        replace,
        onChange
    }
}