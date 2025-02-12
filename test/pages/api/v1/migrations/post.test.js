describe("POST /api/v1/migrations", () => {
    describe("anonymous user", () => {
        describe("Running pending migrations", () => {
            test("when have pending migrations", async () => {
                const migrationsApiResponse = await fetch(
                    "http://localhost:3000/api/v1/migrations",
                    {
                        method: "post",
                    },
                );

                const migrations = await migrationsApiResponse.json();

                expect(migrationsApiResponse.status).toBe(201);
                expect(Array.isArray(migrations)).toBe(true);
                expect(migrations.length).toBeGreaterThan(0);
            });

            test("when does not have pending migrations", async () => {
                const migrationsApiResponse = await fetch(
                    "http://localhost:3000/api/v1/migrations",
                    {
                        method: "post",
                    },
                );

                const migrations = await migrationsApiResponse.json();

                expect(migrationsApiResponse.status).toBe(200);
                expect(Array.isArray(migrations)).toBe(true);
                expect(migrations.length).toBe(0);
            });
        });
    });
});
