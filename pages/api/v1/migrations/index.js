import { runner } from "node-pg-migrate";
import { join } from "node:path";

export default async function (request, response) {
    console.log(process.env.NODE_ENV);
    const migrations = await runner({
        databaseUrl: process.env.DATABASE_URL,
        dir: join("infra", "migrations"),
        direction: "up",
        dryRun: request.method == "GET",
        verbose: true,
        migrationsTable: "pgmigrations",
    });
    return response.status(200).json([...migrations]);
}
