import { useEffect, useState } from 'react';

function useIntervalValue<T>(callback: () => T, delay: number, initialValue?: T): T {
    const [value, setValue] = useState(initialValue ?? callback);

    useEffect(() => {
        const interval = setInterval(async () => {
            setValue(callback);
        }, delay)

        return () => clearInterval(interval);
    }, [callback, delay]);

    return value;
}

function useAsyncIntervalValue<T>(callback: () => T | Promise<T>, delay: number, initialValue?: T | (() => Promise<T>)): T | undefined {
    const [value, setValue] = useState<T>();

    useEffect(() => {
        const interval = setInterval(async () => {
            setValue(await callback());
        }, delay)

        return () => clearInterval(interval);
    }, [callback, delay]);

    useEffect(() => {
        if (typeof initialValue === 'function') {
            (initialValue as () => Promise<T>)().then(setValue)
        } else {
            setValue(initialValue);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return value;
}

export { useIntervalValue, useAsyncIntervalValue };
