import APIError from "@/models/error/APIError";
import AuthenticationService from "@/services/AuthenticationService";
import type ErrorDTO from "@/models/dto/ErrorDTO";

export interface CustomRequestInit extends RequestInit {
    query?: Record<string, string>;
    headers?: Record<string, string>;
    noAuth?: boolean;
    isJsonResponse?: boolean;
}

export default async function APIFetch<T>(
    input: string,
    init?: CustomRequestInit
): Promise<T> {
    if (!input.startsWith("http")) {
        //@ts-ignore
        input = import.meta.env.VITE_API_ROOT + input;
    }

    if (!init) {
        init = {};
    }

    if (!init.headers) {
        init.headers = {};
    }

    if (!init.headers["Accept"]) {
        init.headers["Accept"] = "application/json";
    }

    if (!init.headers["Authorization"] && !init.noAuth) {
        const authenticationService = new AuthenticationService();

        await authenticationService.refreshTokenWhenNeeded();
        const token = await authenticationService.getToken();

        if (token !== null) {
            init.headers["Authorization"] = `Bearer ${token}`;
        }
    }

    if (init.isJsonResponse == undefined) {
        init.isJsonResponse = true;
    }

    if (init.query) {
        const queryString = new URLSearchParams(init.query).toString();

        if (queryString) {
            input += "?" + queryString;
        }
    }

    const response = await fetch(input, init);

    if (!response.ok) {
        const possibleJson = await response.text();
        let json: ErrorDTO = null;

        try {
            json = JSON.parse(possibleJson);
        } catch (e) {
            // Checked by checking for null later
        }

        if (json !== null) {
            throw new APIError(
                json.error.code,
                json.error.reason,
                json.error.description,
            );
        } else {
            const codeMessageMap: Record<number, string> = {
                404: "Not found",
                500: "Internal server error",
                401: "Unauthorized",
                403: "Insufficient permissions",
            };

            let codeMessage = codeMessageMap[response.status];

            if (!codeMessage) {
                codeMessage = "Unknown";
            }

            throw new APIError(
                response.status,
                codeMessage,
                `${response.status} ${codeMessage}`
            );
        }
    }

    if (init.isJsonResponse) {
        return await response.json();
    }

    return <T>{};
}
