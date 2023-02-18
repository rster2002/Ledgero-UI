// TODO look into more secure method of storing the token
export default class TokenStore {
    async store(key: string, token: string) {
        localStorage.setItem(key, token);
    }

    async retrieve(key: string): Promise<string | null> {
        // Explicitly return null as .getItem returns undefined
        return localStorage.getItem(key) ?? null;
    }

    async remove(key: string) {
        localStorage.removeItem(key);
    }
}
