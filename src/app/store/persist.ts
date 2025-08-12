export function loadState<T>(key: string): T | undefined {
    if (typeof window === "undefined") return undefined;
    try {
        const raw = localStorage.getItem(key);
        return raw ? (JSON.parse(raw) as T) : undefined;
    } catch {
        return undefined;
    }
}

export function saveState(key: string, state: unknown) {
    if (typeof window === "undefined") return;
    try {
        localStorage.setItem(key, JSON.stringify(state));
    } catch {}
}
