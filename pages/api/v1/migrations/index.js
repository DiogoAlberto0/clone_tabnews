import database from "infra/database";
import { runner } from "node-pg-migrate";
import { join } from "node:path";

export default async function (request, response) {
    const client = await database.getNewClient();

    try {
        const runnerConfig = {
            dbClient: client,
            dir: join("infra", "migrations"),
            direction: "up",
            dryRun: true,
            verbose: true,
            migrationsTable: "pgmigrations",
        };

        if (request.method == "GET") {
            const pendingMigrations = await runner({
                ...runnerConfig,
            });
            return response.status(200).json([...pendingMigrations]);
        } else if (request.method == "POST") {
            const migratedMigrations = await runner({
                ...runnerConfig,
                dryRun: false,
            });

            if (migratedMigrations.length > 0)
                return response.status(201).json([...migratedMigrations]);
            else return response.status(200).json([...migratedMigrations]);
        }
    } catch (error) {
        console.error(error);
        response.status(500).json({
            error,
        });
    } finally {
        client.end();
    }
}
