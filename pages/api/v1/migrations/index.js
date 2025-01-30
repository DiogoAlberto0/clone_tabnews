import database from "infra/database";
import { runner } from "node-pg-migrate";
import { join } from "node:path";

export default async function (request, response) {
    const allowedMethods = ["POST", "GET"];
    if (!allowedMethods.includes(request.method)) {
        return response.status(405).json({
            error: `Method ${request.method} is not allowed`,
        });
    }
    const client = await database.getNewClient();

    const runnerConfig = {
        dbClient: client,
        dir: join(process.cwd(), "infra", "migrations"),
        direction: "up",
        dryRun: true,
        verbose: true,
        migrationsTable: "pgmigrations",
    };
    try {
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
            error: error.message || "Erro desconhecido",
        });
    } finally {
        client.end();
    }
}
