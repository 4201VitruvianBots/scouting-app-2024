import { Dispatch, SetStateAction, useEffect, useState } from 'react';

function useLocalStorage<T>(
    initialState: T | (() => T),
    key: string
): [T, Dispatch<SetStateAction<T>>] {
    const [state, setState] = useState<T>(
        () => JSON.parse(localStorage.getItem(key) ?? 'null') ?? initialState
    );

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState];
}

export { useLocalStorage };
