test("should return status 200", async () => {
    const response = await fetch("http://localhost:3000/api/v1/status");

    const { sum } = await response.json();

    expect(response.status).toBe(200);
    expect(sum).toBe(2);
});
