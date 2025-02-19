import { httpRouter } from "infra/httpRouter";
import { listPendingMigrations, runPendingMigrations } from "models/migrator";

const { router, handler } = httpRouter();

router.get(async (request, response) => {
    const pendingMigrations = await listPendingMigrations();
    return response.status(200).json([...pendingMigrations]);
});

router.post(async (request, response) => {
    const migratedMigrations = await runPendingMigrations();

    if (migratedMigrations.length > 0)
        return response.status(201).json([...migratedMigrations]);
    else return response.status(200).json([...migratedMigrations]);
});

export default handler();
