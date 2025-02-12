

test("should return status 200", async () => {
    const response = await fetch("http://localhost:3000/api/v1/status");

    const body = await response.json();

    const parsedUpdatedAt = new Date(body.updated_at);
    const now = new Date();

    expect(body.updated_at).toEqual(parsedUpdatedAt.toISOString());
    expect(now.getDate()).toEqual(parsedUpdatedAt.getDate());
    expect(now.getMonth()).toEqual(parsedUpdatedAt.getMonth());
    expect(now.getYear()).toEqual(parsedUpdatedAt.getYear());

    expect(body).toEqual({
        updated_at: expect.stringContaining(parsedUpdatedAt.toISOString()),
        dependencies: {
            database: {
                version: 16.6,
                max_connections: 100,
                active_connections: 1,
            },
        },
    });
});
