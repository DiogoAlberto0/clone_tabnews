
test("should return status 200", async () => {
    const migrationsApiResponse = await fetch(
        "http://localhost:3000/api/v1/migrations",
    );
    const migrations = await migrationsApiResponse.json();

    expect(migrationsApiResponse.status).toBe(200);

    expect(Array.isArray(migrations)).toBe(true);
    expect(migrations.length).toBeGreaterThan(0);

    const migrationsApiResponse2 = await fetch(
        "http://localhost:3000/api/v1/migrations",
    );
    const migrations2 = await migrationsApiResponse2.json();

    expect(migrationsApiResponse2.status).toBe(200);

    expect(Array.isArray(migrations2)).toBe(true);
    expect(migrations2.length).toBeGreaterThan(0);
});
