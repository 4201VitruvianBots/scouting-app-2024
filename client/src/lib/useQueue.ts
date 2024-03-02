import { useCallback, useState } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { postJson } from './postJson'
import { useWatch } from './useWatch';

function useQueue(): [send: (url: string, data: unknown) => void, sendAll: () => void, queue: [url: string, data: unknown][], sending: boolean] {
    const [queue, setQueue] = useLocalStorage<[url: string, data: unknown][]>([], 'queue')    
    const [sending, setSending] = useState(false);
    
    const attemptSend = useCallback(() => {
        console.log(sending, queue)
        if (sending || queue.length === 0) return;
        setSending(true)
        Promise.allSettled(queue.map(queueItem => (
            postJson(...queueItem)
                .then(result => {
                    if (result.ok) {
                        setQueue(queue => queue.filter(e => e !== queueItem))
                    }
                })
                .catch(() => {})
        ))).then(() => setSending(false))
    }, [queue, sending, setQueue])
    
    useWatch(() => {
        attemptSend();
    }, queue)

    const addToQueue = useCallback((url: string, data: unknown) => {
        setQueue(queue => [...queue, [url, data]])
    }, [setQueue])
    
    return [addToQueue, attemptSend, queue, sending]
}

export {useQueue}
