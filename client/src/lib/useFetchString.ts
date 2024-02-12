import { useEffect, useState } from 'react';

function useFetchString(url: string): string | undefined;
function useFetchString(url: string, defaultValue: string): string;
function useFetchString(url: string, defaultValue?: string): string | undefined {
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        const handler = async () => {
            try {
                const result = await fetch(url);
                if (!result.ok) return;
                setValue(await result.text());
                clearInterval(interval);
            } catch (err) {
                console.debug(`Fetching ${url} did not succeed`);
            }
        }
        const interval = setInterval(handler, 5000); // stringry every 5 seconds
        handler();

        return () => clearInterval(interval);
    }, [url])

    return value;
}

export { useFetchString };
