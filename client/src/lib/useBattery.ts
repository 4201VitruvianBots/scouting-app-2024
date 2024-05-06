import { useEffect, useState } from 'react';

function useBattery() {
    const [batteryLevel, setBatteryLevel] = useState<number | undefined>();

    useEffect(() => {
        const handler = window.navigator.getBattery?.().then(battery => {
            const handler = () => {
                setBatteryLevel(battery.level);
            };
            handler();
            battery.addEventListener('levelchange', handler);
            return () => {
                battery.removeEventListener('levelchange', handler);
            };
        });
        return () => {
            handler?.then(handler => handler());
        };
    }, []);
    return batteryLevel;
}

export { useBattery };
