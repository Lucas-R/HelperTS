export interface UserFetchProps {
    endpoint: string,
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    headers?: any,
    body?: any
}

export interface UserFetchResponseProps<T> {
    data: T | null,
    error: any
}

export interface CacheItem<T> {
    result: UserFetchResponseProps<T>;
    timestamp: number;
};