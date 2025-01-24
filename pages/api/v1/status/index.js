import database from "../../../../infra/database.js";

export default async function (request, response) {
    const result = await database.query("SELECT 1 + 1 as sum;");

    const sum = result.rows[0].sum;

    response.status(200).json({
        sum,
    });
}
