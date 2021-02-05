export class LocalStorageMock {
    store: { [key: string]: string };

    constructor() {
        this.store = {};
    }

    clear(): void {
        this.store = {};
    }

    getItem(key: string): string {
        return this.store[key];
    }

    setItem(key: string, value: string): void {
        this.store[key] = String(value);
    }

    removeItem(key: string): void {
        delete this.store[key];
    }

    get length(): number {
        return Object.keys(this.store).length;
    }

    key(index: number): string {
        return Object.keys(this.store)[index];
    }
}
