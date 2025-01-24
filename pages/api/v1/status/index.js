export default function (request, response) {
    response.status(200).json({
        hello: "world",
    });
}
