import { EffectCallback, useEffect, useRef } from 'react';

function useWatch(callback: EffectCallback, dependency: unknown) {
    const callbackRef = useRef(callback);
    callbackRef.current = callback;
    useEffect(() => {
        return callbackRef.current();
    }, [dependency]);
}

export { useWatch };
