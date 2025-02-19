import { join } from "node:path";
import database from "infra/database";
import runner from "node-pg-migrate";

const runnerConfig = {
    dir: join(process.cwd(), "infra", "migrations"),
    direction: "up",
    dryRun: false,
    verbose: true,
    migrationsTable: "pgmigrations",
};

const listPendingMigrations = async () => {
    let client;

    try {
        client = await database.getNewClient();

        const pendingMigrations = await runner({
            ...runnerConfig,
            dbClient: client,
            dryRun: true,
        });

        return pendingMigrations;
    } finally {
        client?.end();
    }
};

const runPendingMigrations = async () => {
    let client;
    try {
        client = await database.getNewClient();

        const pendingMigrations = await runner({
            ...runnerConfig,
            dbClient: client,
        });
        return pendingMigrations;
    } finally {
        client?.end();
    }
};

export { listPendingMigrations, runPendingMigrations };
