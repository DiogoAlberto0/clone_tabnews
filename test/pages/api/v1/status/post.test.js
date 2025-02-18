describe("POST /api/v1/status", () => {
    describe("anonymous user", () => {
        test("Tring retrive current system status with POST method", async () => {
            const response = await fetch(
                "http://localhost:3000/api/v1/status",
                {
                    method: "POST",
                },
            );

            const body = await response.json();

            expect(response.status).toEqual(405);
            expect(body).toEqual({
                message: "Method Is Not Allowed",
                name: "MethodNotAllowedError",
                action: "Verifique se o método acessado está disponivel para o endpoint.",
                status_code: 405,
            });
        });
    });
});
