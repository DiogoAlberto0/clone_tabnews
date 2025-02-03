const reset = "\x1b[0m";
const green = "\x1b[32m";
const yellow = "\x1b[33m";
const red = "\x1b[31m";

const time = 500;

process.stdout.write(`${yellow} Aguardando servidor next iniciar ${reset}\n\n`);

const verifyPostgresActivity = async () => {
    try {
        const response = await fetch("http://localhost:3000/api/v1/status");

        if (response.status === 200) {
            process.stdout.write(" ]\n\n");
            process.stdout.write(
                `${green} Servidor next está pronto ${reset}\n\n`,
            );
            return;
        } else throw new Error();
    } catch (error) {
        process.stdout.write("=");
        await new Promise((resolve) => setTimeout(resolve, time));
        await verifyPostgresActivity();
        return;
    }
};

process.stdout.write("[ ");

(async () => {
    await verifyPostgresActivity();
})();
