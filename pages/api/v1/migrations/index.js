import database from "infra/database";
import { runner } from "node-pg-migrate";
import { join } from "node:path";

import { httpRouter } from "infra/httpRouter";

const { router, handler } = httpRouter();

const runnerConfig = {
    dir: join(process.cwd(), "infra", "migrations"),
    direction: "up",
    dryRun: true,
    verbose: true,
    migrationsTable: "pgmigrations",
};

const postHandler = async (request, response) => {
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

const getHandler = async (request, response) => {
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

router.get(getHandler);

router.post(postHandler);

export default handler();
