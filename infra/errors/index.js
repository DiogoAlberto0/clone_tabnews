export class InternalServerError extends Error {
    constructor({ cause }) {
        super("Internal Server Error");
        this.name = "InternalServerError";
        this.action = "Contact the suport";
        this.statusCode = 500;
        this.cause = cause;
    }
}
