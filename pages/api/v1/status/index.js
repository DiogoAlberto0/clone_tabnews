import database from "infra/database.js";

import { httpRouter } from "infra/httpRouter";

const { router, handler } = httpRouter();

async function getHandler(request, response) {
    const createdAt = new Date().toISOString();

    const { rows } = await database.query({
        text: `
           SELECT
                current_setting('server_version')::float AS version,
                (SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1) AS active_connections,
                (SELECT current_setting('max_connections')::int) AS max_connections;
        `,
        values: [process.env.POSTGRES_DB],
    });

    const version = rows[0].version;
    const max_connections = rows[0].max_connections;
    const active_connections = rows[0].active_connections;

    response.status(200).json({
        updated_at: createdAt,
        dependencies: {
            database: {
                version,
                max_connections,
                active_connections,
            },
        },
    });
}

router.get(getHandler);

export default handler();
