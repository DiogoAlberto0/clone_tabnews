import { Client } from "pg";

const query = async (queryDatabase) => {
    const client = new Client({
        host: process.env.POSTGRES_HOST,
        user: process.env.POSTGRES_USER,
        database: process.env.POSTGRES_DB,
        port: process.env.POSTGRES_PORT,
        password: process.env.POSTGRES_PASSWORD,
        ssl: process.env.NODE_ENV !== "development",
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
export default {
    query: query,
};
