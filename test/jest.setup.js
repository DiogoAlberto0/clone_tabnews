import { verifyNextActivity } from "infra/scripts/wait-for-next";
import database from "infra/database";

beforeAll(async () => {
    await verifyNextActivity();
    await database.cleanDatabase();
});
