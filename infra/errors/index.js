export class InternalServerError extends Error {
    constructor({ cause }) {
        super("Internal Server Error");
        this.name = "InternalServerError";
        this.action = "Contact the suport";
        this.statusCode = 500;
        this.cause = cause;
    }
}

export class MethodNotAllowedError extends Error {
    constructor() {
        super("Method Is Not Allowed");
        this.name = "MethodNotAllowedError";
        this.action =
            "Verifique se o método acessado está disponivel para o endpoint.";
        this.statusCode = 405;
    }
}
