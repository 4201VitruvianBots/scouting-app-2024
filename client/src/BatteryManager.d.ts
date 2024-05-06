export interface BatteryManager extends EventTarget {
    /** A Boolean value indicating whether the battery is currently being charged. */
    readonly charging: boolean;
    /** A number representing the remaining time in seconds until the battery is fully charged, or 0 if the battery is already fully charged. */
    readonly chargingTime: number;
    /** A number representing the remaining time in seconds until the battery is completely discharged and the system suspends. */
    readonly dischargingTime: number;
    /** A number representing the system's battery charge level scaled to a value between 0.0 and 1.0. */
    readonly level: number;

    addEventListener(
        type:
            | string
            | 'chargingchange'
            | 'chargingtimechange'
            | 'dischargingtimechange'
            | 'levelchange',
        callback: EventListenerOrEventListenerObject | null,
        options?: AddEventListenerOptions | boolean
    ): void;
}

declare global {
    interface Navigator {
        getBattery?(): Promise<BatteryManager>;
    }
}
