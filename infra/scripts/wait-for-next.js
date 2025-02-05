const reset = "\x1b[0m";
const green = "\x1b[32m";
const yellow = "\x1b[33m";
const red = "\x1b[31m";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const verifyNextActivity = async ({ tries = 50, timePerTry = 1000 } = {}) => {
    process.stdout.write(
        `${yellow} Aguardando servidor next iniciar ${reset}\n\n`,
    );

    for (let i = 0; i < tries; i++) {
        try {
            const response = await fetch("http://localhost:3000/api/v1/status");

            if (response.ok) {
                process.stdout.write(`${green} Servidor iniciado ${reset}\n`);
                return;
            } else {
                process.stdout.write(
                    `${yellow} ${response.status}:${response.statusText} - ${response.url} ${reset}\n`,
                );
            }

            await delay(timePerTry);
        } catch (error) {
            process.stdout.write(
                `${yellow} Error: ${error.message} ${yellow} cause: ${error.cause} ${reset}\n`,
            );
        }
    }
    process.stdout.write(
        `${red} Número máximo de tentativas excedido. Max:${tries} ${reset}\n`,
    );
};

export { verifyNextActivity };
