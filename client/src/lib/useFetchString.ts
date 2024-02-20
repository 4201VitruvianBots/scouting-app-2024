import { useEffect, useState } from 'react';

function useFetchString(url: string): string | undefined;
function useFetchString(url: string, defaultValue: string): string;
function useFetchString(url: string, defaultValue?: string): string | undefined {
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        const controller = new AbortController();

        const handler = async () => {
            try {
                const result = await fetch(url, {signal: controller.signal});
                if (result.ok)
                    setValue(await result.text());
                clearInterval(interval);
            } catch (err) {
                if (!controller.signal.aborted)
                    console.debug(`Fetching ${url} did not succeed`);
            }
        }
        const interval = setInterval(handler, 5000); // Try every 5 seconds
        handler();

        return () => {
            clearInterval(interval);
            controller.abort();
        }
    }, [url])

    return value;
}

export { useFetchString };
