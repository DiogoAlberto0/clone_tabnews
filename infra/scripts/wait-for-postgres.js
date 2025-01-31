import { exec } from "node:child_process";

const reset = "\x1b[0m";
const green = "\x1b[32m";
const yellow = "\x1b[33m";
const red = "\x1b[31m";

process.stdout.write(
    `${yellow} Aguardando postgres aceitar conexões ${reset}\n\n`,
);

const verifyPostgresActivity = () => {
    exec(
        "docker exec postgres-dev pg_isready --host localhost",
        (error, stdout) => {
            if (stdout.search("accepting connections") === -1) {
                process.stdout.write("=");
                verifyPostgresActivity();
                return;
            } else if (error) {
                process.stdout.write(
                    `${red} ${error.message || "Ocorreu um erro deconhecido"} ${reset}\n\n`,
                );
                return 2;
            } else {
                process.stdout.write(" ]\n\n");
                process.stdout.write(
                    `${green} Postgres está pronto e aceitando conexões ${reset}\n\n`,
                );
            }
        },
    );
};

process.stdout.write("[ ");
verifyPostgresActivity();
