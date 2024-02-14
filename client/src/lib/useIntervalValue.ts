import { useEffect, useState } from 'react';

function useIntervalValue<T>(callback: () => T, delay: number): T | undefined;
function useIntervalValue<T>(callback: () => T, delay: number, initialValue: T): T;
function useIntervalValue<T>(callback: () => T, delay: number, initialValue?: T) {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        const interval = setInterval(() => {
            setValue(callback);
        }, delay)

        return () => clearInterval(interval);
    }, [callback, delay]);

    return value;
}

export { useIntervalValue };
