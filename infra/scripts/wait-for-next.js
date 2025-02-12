const reset = "\x1b[0m";
const green = "\x1b[32m";
const yellow = "\x1b[33m";
const red = "\x1b[31m";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const print = (message, color) => {
    process.stdout.write(`${color} ${message} ${reset}\n\n`);
};
const verifyNextActivity = async ({ tries = 50, timePerTry = 1000 } = {}) => {
    print("Aguardando servidor next iniciar...", yellow);

    for (let i = 0; i < tries; i++) {
        await delay(timePerTry);
        try {
            const response = await fetch("http://localhost:3000/api/v1/status");

            if (response.ok) {
                print("Servidor iniciado", green);
                return;
            } else {
                print(
                    `${response.status}:${response.statusText} - ${response.url}...`,
                    yellow,
                );
            }
        } catch (error) {
            print(
                `Error: ${error.message} ${yellow} cause: ${error.cause}`,
                yellow,
            );
        }
    }
    print(`Número máximo de tentativas excedido. Max:${tries}`, red);
};

(async () => {
    try {
        await verifyNextActivity();
    } catch (error) {
        console.error("Erro:", error);
        process.exit(1);
    }
})();
