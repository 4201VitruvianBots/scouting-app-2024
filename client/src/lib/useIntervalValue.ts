import { useEffect, useState } from 'react';

function useIntervalValue<T>(callback: () => T | Promise<T>, delay: number): T | undefined;
function useIntervalValue<T>(callback: () => T | Promise<T>, delay: number, initialValue: T): T;
function useIntervalValue<T>(callback: () => T | Promise<T>, delay: number, initialValue?: T) {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        const interval = setInterval(async () => {
            setValue(await callback());
        }, delay)

        return () => clearInterval(interval);
    }, [callback, delay]);

    return value;
}

export { useIntervalValue };
