import AsyncLock from "@/helpers/AsyncLock";
import TokenStore from "@/services/TokenStore";
import SessionStore from "@/services/SessionStore";
import APIFetch from "@/helpers/APIFetch";
import type JWTResponseDTO from "@/models/dto/jwt/JWTResponseDto";
import type UserDTO from "@/models/dto/user/UserDTO";
import JWTHelper from "@/helpers/JWTHelper";

const globalRefreshPromise = Promise.resolve();
const refreshLock = new AsyncLock();

export default class AuthenticationService {
    private readonly tokenStore: TokenStore = new TokenStore();
    private readonly sessionStore: SessionStore = new SessionStore();

    async login(username: string, password: string) {
        const jwtPair: JWTResponseDTO = await APIFetch("/auth/login", {
            method: "POST",
            noAuth: true,
            body: JSON.stringify({
                username,
                password,
            }),
        });

        await this.tokenStore.store("token", jwtPair.access_token);
        await this.tokenStore.store("refresh", jwtPair.refresh_token);
    }

    async logout() {
        const token = await this.tokenStore.retrieve("token");
        const refresh = await this.tokenStore.retrieve("refresh");

        APIFetch("/auth/revoke", {
            method: "POST",
            isJsonResponse: false,
            body: JSON.stringify({
                currentJWT: token,
                refreshToken: refresh,
            }),
        });

        await this.tokenStore.remove("token");
        await this.tokenStore.remove("refresh");

        await this.sessionStore.remove("account-info");
    }

    async getToken(): Promise<string | null> {
        return await this.tokenStore.retrieve("token");
    }

    async getRefresh(): Promise<string | null> {
        return await this.tokenStore.retrieve("refresh");
    }

    async isLoggedIn() {
        const token = await this.getToken();
        return token !== null;
    }

    /**
     * @returns user information about the current logged-in user.
     */
    async getAccountInfo(): Promise<UserDTO> {
        const saved = this.sessionStore.get<UserDTO>("account-info");

        if (saved !== null) {
            return saved;
        }

        const adminResponse: UserDTO = await APIFetch("/users/me");
        this.sessionStore.set("account-info", adminResponse);

        return adminResponse;
    }

    async refreshTokenWhenNeeded() {
        // Await current promise
        await refreshLock.lock();
        await globalRefreshPromise;

        const token = await this.getToken();

        if (token === null) {
            refreshLock.release();
            return; // No token, so no need to fresh
        }

        const tokenPayload = JWTHelper.getJWTClaims(token);

        // This will only ever be false for the first request to refresh if there are multiple, because the first request
        // will set `globalRefreshPromise` and any subsequent refresh requests wait the `globalRefreshPromise`
        const expireDate = new Date(tokenPayload.exp);
        if (expireDate.getTime() * 1000 > Date.now()) {
            refreshLock.release();
            return; // Not expired
        }

        await this.refresh();
        refreshLock.release();
    }

    private async refresh() {
        const token = await this.getToken();
        const refreshToken = await this.getRefresh();

        if (refreshToken === null) {
            throw new Error("Cannot refresh token");
        }

        const refreshPayload = JWTHelper.getJWTClaims(refreshToken);

        const refreshExpireDate = new Date(refreshPayload.exp);

        if (refreshExpireDate.getTime() < Date.now()) {
            throw new Error("Refresh token has expired");
        }

        const jwtPair: JWTResponseDTO = await APIFetch("/auth/refresh", {
            method: "POST",
            noAuth: true,
            body: JSON.stringify({
                access_token: token,
                refresh_token: refreshToken,
            }),
        });

        await this.tokenStore.store("token", jwtPair.access_token);
        await this.tokenStore.store("refresh", jwtPair.refresh_token);
    }
}
