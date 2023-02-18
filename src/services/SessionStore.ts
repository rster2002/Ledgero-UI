import RequiredModelError from "@/models/error/RequiredModelError";

export default class SessionStore {
    set(key: string, value: unknown) {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    get<T>(key: string): T | null {
        const jsonString = sessionStorage.getItem(key);
        return jsonString !== null ? JSON.parse(jsonString) : null;
    }

    remove(key: string) {
        sessionStorage.removeItem(key);
    }

    require<T>(key: string): T {
        const value: T | null = this.get(key);

        if (value === null) {
            throw new RequiredModelError(
                `Failed to get key '${key}' in session storage`
            );
        }

        return value;
    }

    exists(key: string): boolean {
        return sessionStorage.getItem(key) !== null;
    }
}
