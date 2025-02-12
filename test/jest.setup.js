import database from "infra/database";

beforeAll(async () => {
    await database.cleanDatabase();
});
