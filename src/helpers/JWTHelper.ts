import type JWTClaims from "@/models/jwt/JWTClaims";

export default abstract class JWTHelper {
    static getPayloadFromJWT<T>(token: string): T {
        const parts = token.split(".");

        if (parts.length !== 3) {
            throw new Error("JWT token did now have three parts");
        }

        return <T>JSON.parse(atob(parts[1]));
    }

    static getJWTClaims(accessToken: string): JWTClaims {
        const parts = accessToken.split(".");

        if (parts.length !== 3) {
            throw new Error("JWT token did now have three parts");
        }

        return <JWTClaims>JSON.parse(atob(parts[0]));
    }
}
