import { useCallback, useRef } from 'react';

/**
 * Extracts one property from an object state as a state pair.
 *
 * @param object The object state
 * @param setObject The setter for the object state
 * @param key The property to read and modify
 * @returns An state pair which gets and sets the specified property
 */
function usePropState<T extends object, K extends keyof T>(object: T, setObject: (value: T) => void, key: K): [T[K], (value: T[K]) => void] {
    const objectRef = useRef(object);
    objectRef.current = object;

    const setState = useCallback((value: T[K]) => {
        setObject({ ...objectRef.current, [key]: value });
    }, [key, setObject]);

    return [object[key], setState];
}

export { usePropState };
