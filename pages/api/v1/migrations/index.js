import database from "infra/database";
import { runner } from "node-pg-migrate";
import { join } from "node:path";

import { createRouter } from "next-connect";
import { InternalServerError, MethodNotAllowedError } from "infra/errors";

const router = createRouter();

const postHandller = async (request, response) => {
    let client;

    try {
        client = await database.getNewClient();

        const migratedMigrations = await runner({
            ...runnerConfig,
            dbClient: client,
            dryRun: false,
        });

        if (migratedMigrations.length > 0)
            return response.status(201).json([...migratedMigrations]);
        else return response.status(200).json([...migratedMigrations]);
    } finally {
        client.end();
    }
};

const getHandller = async (request, response) => {
    let client;
    try {
        client = await database.getNewClient();

        const pendingMigrations = await runner({
            ...runnerConfig,
            dbClient: client,
        });
        return response.status(200).json([...pendingMigrations]);
    } finally {
        client.end();
    }
};

router.get(getHandller);
router.post(postHandller);

const onNoMatch = async (request, response) => {
    const methodNotAllowedError = new MethodNotAllowedError();

    return response.status(methodNotAllowedError.statusCode).json({
        name: methodNotAllowedError.name,
        message: methodNotAllowedError.message,
        action: methodNotAllowedError.action,
        status_code: methodNotAllowedError.statusCode,
    });
};

const onError = async (error, request, response) => {
    const InternalError = new InternalServerError({ cause: error.cause });

    return response.status(InternalError.statusCode).json({
        name: InternalError.name,
        message: InternalError.message,
        action: InternalError.action,
        status_code: InternalError.statusCode,
    });
};
export default router.handler({
    onError,
    onNoMatch,
});

const runnerConfig = {
    dir: join(process.cwd(), "infra", "migrations"),
    direction: "up",
    dryRun: true,
    verbose: true,
    migrationsTable: "pgmigrations",
};
