import { Dispatch, SetStateAction, useCallback } from 'react';

function apply<T>(action: SetStateAction<T>, oldValue: T): T {
    return typeof action === 'function'
        ? (action as (prev: T) => T)(oldValue)
        : action;
}

/**
 * Extracts one property from an object state as a state pair.
 *
 * @param object The object state
 * @param setObject The setter for the object state
 * @param key The property to read and modify
 * @returns An state pair which gets and sets the specified property
 */
function usePropState<T extends object, K extends keyof T>(
    object: T,
    setObject: Dispatch<SetStateAction<T>>,
    key: K
): [T[K], Dispatch<SetStateAction<T[K]>>] {
    const setState = useCallback(
        (value: SetStateAction<T[K]>) => {
            setObject(object => ({
                ...object,
                [key]: apply(value, object[key]),
            }));
        },
        [key, setObject]
    );

    return [object[key], setState];
}

export { usePropState };
