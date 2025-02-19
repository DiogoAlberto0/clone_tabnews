import { createRouter } from "next-connect";

import { InternalServerError, MethodNotAllowedError } from "infra/errors";

const httpRouter = () => {
    const router = createRouter();

    const handler = () => {
        return router.handler({
            onNoMatch: async (request, response) => {
                const methodNotAllowedError = new MethodNotAllowedError();

                return response.status(methodNotAllowedError.statusCode).json({
                    name: methodNotAllowedError.name,
                    message: methodNotAllowedError.message,
                    action: methodNotAllowedError.action,
                    status_code: methodNotAllowedError.statusCode,
                });
            },
            onError: async (error, request, response) => {
                const InternalError = new InternalServerError({
                    cause: error.cause,
                });

                return response.status(InternalError.statusCode).json({
                    name: InternalError.name,
                    message: InternalError.message,
                    action: InternalError.action,
                    status_code: InternalError.statusCode,
                });
            },
        });
    };

    return {
        router,
        handler,
    };
};

export { httpRouter };
