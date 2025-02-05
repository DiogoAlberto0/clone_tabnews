import { verifyNextActivity } from "infra/scripts/wait-for-next";

beforeAll(async () => {
    await verifyNextActivity();
});
