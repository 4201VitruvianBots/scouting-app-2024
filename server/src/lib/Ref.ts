class Ref<T> {
    #value: Readonly<T>
    #callbacks: ((value: T) => void)[] = []

    constructor(initialValue: T) {
        this.#value = initialValue;
    }

    get value(): T {
        return this.#value;
    }

    set value(value: T) {
        this.#value = value;
        this.triggerUpdate();
    }

    on(event: 'change', callback: (value: T) => void): (value: T) => void {
        this.#callbacks.push(callback);
        return callback;
    }

    off(event: 'change', callback: (value: T) => void) {
        const index = this.#callbacks.indexOf(callback);
        if (index === -1) return;
        this.#callbacks.splice(index, 1)
    }

    triggerUpdate() {
        this.#callbacks.forEach(callback => callback(this.#value));
    }
}

export { Ref };
