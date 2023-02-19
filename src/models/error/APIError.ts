import ApplicationError from "@/models/error/ApplicationError";

export default class APIError extends ApplicationError {
    private readonly code: number;
    private readonly reason: string;
    private readonly description: string;

    constructor(code: number, reason: string, description: string) {
        super(description);
    }

    getCode(): number {
        return this.code;
    }

    getReason(): string {
        return this.reason;
    }

    getDescription(): string {
        return this.description;
    }
};
