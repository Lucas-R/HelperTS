import env from "@/constants/env";
import type { CacheItem, UserFetchProps, UserFetchResponseProps } from "@/types/UseFetchProps";

const cache = new Map<string, CacheItem<any>>();

export async function useFetch<T = any>(input: string | UserFetchProps): Promise<UserFetchResponseProps<T>> {
    let data  = null;
    let error = null;
    let payload = {
        endpoint: input,
        method: "GET",
        headers: { "Content-Type": "application/json" },
        body: undefined
    } as UserFetchProps;

    if(typeof input !== "string") payload = {...payload, ...input};

    if(!payload.endpoint) return { data: null, error: "invalid endpoint" };

    const cacheKey = `${payload.method}:${payload.endpoint}`;
    
    if (payload.method?.toUpperCase() === "GET" && cache.has(cacheKey)) {
        const cached = cache.get(cacheKey)!;

        if (Date.now() - cached.timestamp < 5 * 60 * 1000) {
            return cached.result;
        } else {
            cache.delete(cacheKey);
        }
    }

    try {
        const options: RequestInit = {
            method: payload.method!.toUpperCase(),
            headers: payload.headers,
        };

        if (payload.body) {
            options.body = typeof payload.body === "string" ? payload.body : JSON.stringify(payload.body);
        }

        const response = await fetch(env.api + payload.endpoint, options);
        data = await response.json();
    } catch (err) {
        error = err;
        throw new Error(`Erro: ${err}`);
    }

    const result: UserFetchResponseProps<T> = { data, error };

    if(payload.method?.toUpperCase() === "GET") {
        cache.set(cacheKey, { result, timestamp: Date.now() });
    }

    return result;
}