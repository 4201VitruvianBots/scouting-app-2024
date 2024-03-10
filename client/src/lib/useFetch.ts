import { useCallback, useEffect, useState } from 'react';

function useFetch<T>(url: string, resultHandler: (this: Response) => Promise<T>, defaultValue?: T): [value: T | undefined, reload: () => void] {
    const [value, setValue] = useState(defaultValue);

    const tryFetch = useCallback(() => {
        const controller = new AbortController();

        const handler = async () => {
            try {
                const result = await fetch(url, {signal: controller.signal});
                if (result.ok)
                    setValue(await resultHandler.bind(result)());
                clearInterval(interval);
            } catch (err) {
                if (!controller.signal.aborted)
                    console.debug(`Fetching ${url} did not succeed`);
            }
        }
        const interval = setInterval(handler, 5000); // Try every 5 seconds
        handler();

        return {
            cleanup: () => {
                clearInterval(interval);
                controller.abort();
            }
        }
    }, [resultHandler, url]);

    useEffect(() => {
        return tryFetch().cleanup
    }, [tryFetch])

    return [value, tryFetch];
}

function useFetchString(url: string): [value: string | undefined, reload: () => void];
function useFetchString(url: string, defaultValue: string): [value: string, reload: () => void];
function useFetchString(url: string, defaultValue?: string) {
    return useFetch(url, Response.prototype.text, defaultValue);
}

function useFetchJson<T = unknown>(url: string): [value: T | undefined, reload: () => void];
function useFetchJson<T = unknown>(url: string, defaultValue: T): [value: T, reload: () => void];
function useFetchJson<T = unknown>(url: string, defaultValue?: T) {
    return useFetch(url, Response.prototype.json, defaultValue);
}

export { useFetchJson, useFetchString, useFetch };
