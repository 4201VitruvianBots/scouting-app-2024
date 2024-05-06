import { Dispatch, SetStateAction, useMemo } from 'react';

function apply<T>(action: SetStateAction<T>, oldValue: T): T {
    return typeof action === 'function'
        ? (action as (prev: T) => T)(oldValue)
        : action;
}

interface ArrayOperations<T> {
    add: (value: T) => void;
    set: (index: number, value: SetStateAction<T>) => void;
    remove: (index: number) => void;
    insert: (index: number, value: T) => void;
    splice: (startIndex: number, deleteCount: number, replaceWith: T[]) => void;
}

/**
 * A hook that provides utility functions for managing an array state.
 *
 * @param array - The initial array state.
 * @param setArray - The state setter function.
 * @returns An object containing array manipulation functions.
 */
function useArrayState<T>(
    setArray: Dispatch<SetStateAction<T[]>>
): ArrayOperations<T> {
    const actions = useMemo<ArrayOperations<T>>(
        () => ({
            add(value: T) {
                setArray(array => [...array, value]);
            },
            remove(index: number) {
                setArray(array => array.filter((_, i) => i !== index));
            },
            set(index: number, value: SetStateAction<T>) {
                setArray(array =>
                    array.map((e, i) => (i === index ? apply(value, e) : e))
                );
            },
            insert(index: number, value: T) {
                setArray(array => [
                    ...array.slice(0, index),
                    value,
                    ...array.slice(index),
                ]);
            },
            splice(
                startIndex: number,
                deleteCount: number,
                replaceWith: T[] = []
            ) {
                setArray(array => [
                    ...array.slice(0, startIndex),
                    ...replaceWith,
                    ...array.slice(startIndex + deleteCount),
                ]);
            },
        }),
        [setArray]
    );

    return actions;
}

export { useArrayState, type ArrayOperations };
