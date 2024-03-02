import { useCallback, useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { postJson } from './postJson'

function useQueue(): [send: (url: string, data: unknown) => void, sendAll: () => void, queue: [url: string, data: unknown][]] {
    const [queue, setQueue] = useLocalStorage<[url: string, data: unknown][]>([], 'queue')    
    
    const attemptSend = useCallback(async () => {
        queue.forEach(queueItem => {
            postJson(...queueItem)
                .then(() => setQueue(queue.filter(e => e !== queueItem)))
                .catch(() => {})
        })
    }, [queue, setQueue])
    
    useEffect(() => {
        attemptSend();
    }, [attemptSend, queue])

    const addToQueue = useCallback((url: string, data: unknown) => {
        setQueue(queue => [...queue, [url, data]])
    }, [setQueue])
    
    return [addToQueue, attemptSend, queue]
}

export {useQueue}
