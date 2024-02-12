import { useEffect, useState } from 'react';

function useFetchJson<T = unknown>(url: string): T | undefined;
function useFetchJson<T = unknown>(url: string, defaultValue: T): T;
function useFetchJson<T = unknown>(url: string, defaultValue?: T): T | undefined {
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        const handler = async () => {
            try {
                const result = await fetch(url);
                if (result.ok)
                    setValue(await result.json());
                clearInterval(interval);
            } catch (err) {
                console.debug(`Fetching ${url} did not succeed`);
            }
        }
        const interval = setInterval(handler, 5000); // Try every 5 seconds
        handler();

        return () => clearInterval(interval);
    }, [url])

    return value;
}

export { useFetchJson };
