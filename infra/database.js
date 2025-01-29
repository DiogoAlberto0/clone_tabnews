import { Client } from "pg";

const query = async (queryDatabase) => {
    const client = new Client({
        host: process.env.POSTGRES_HOST,
        user: process.env.POSTGRES_USER,
        database: process.env.POSTGRES_DB,
        port: process.env.POSTGRES_PORT,
        password: process.env.POSTGRES_PASSWORD,
        ssl: process.env.NODE_ENV === "production",
    });

    try {
        client.connect();
        const result = await client.query(queryDatabase);
        return result;
    } catch (error) {
        console.error(error);
    } finally {
        client.end();
    }
};

const cleanDatabase = async () => {
    await query("DROP SCHEMA public CASCADE; CREATE SCHEMA public");
};

export default {
    query,
    cleanDatabase,
};
