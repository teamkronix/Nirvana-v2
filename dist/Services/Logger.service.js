import moment from "moment";
import chalk from "chalk";
export default class Logger {
    client;
    constructor(client) {
        this.client = client;
    }
    error(error, content) {
        const date = `${moment().format("DD-MM-YYYY hh:mm:ss")}`;
        console.error(chalk.yellow(`[${date}] : [LOGS] ->`), chalk.red(` [${error}] =>  ${content}`));
        this.client.botfunctions.webhooklog("error", content, error);
    }
    warn(error, content) {
        const date = `${moment().format("DD-MM-YYYY hh:mm:ss")}`;
        console.error(chalk.yellow(`[${date}] : [LOGS] ->`), chalk.gray(` [${error}] =>  ${content}`));
        this.client.botfunctions.webhooklog("warn", content, error);
    }
    debug(name, content) {
        const date = `${moment().format("DD-MM-YYYY hh:mm:ss")}`;
        console.log(chalk.yellow(`[${date}] : [DEBUG] ->`), chalk.magenta(` [${name}] =>  ${content}`));
        this.client.botfunctions.webhooklog("misc", content, name);
    }
    event(name, content) {
        const date = `${moment().format("DD-MM-YYYY hh:mm:ss")}`;
        console.log(chalk.yellow(`[${date}] : [Events] ->`), chalk.cyan(` [${name}] =>  ${content}`));
        this.client.botfunctions.webhooklog("event", content, name);
    }
    log(name, content) {
        const date = `${moment().format("DD-MM-YYYY hh:mm:ss")}`;
        console.log(chalk.yellow(`[${date}] : [LOGS] ->`), chalk.greenBright(` [${name}] =>  ${content}`));
        this.client.botfunctions.webhooklog("logs", content, name);
    }
    command(name, content) {
        const date = `${moment().format("DD-MM-YYYY hh:mm:ss")}`;
        console.log(chalk.yellow(`[${date}] : [COMMAND] ->`), chalk.greenBright(` [${name}] =>  ${content}`));
        this.client.botfunctions.webhooklog("command", content, name);
    }
    node(name, content) {
        const date = `${moment().format("DD-MM-YYYY hh:mm:ss")}`;
        console.log(chalk.yellow(`[${date}] : [NODE] ->`), chalk.greenBright(` [${name}] =>  ${content}`));
        this.client.botfunctions.webhooklog("node", content, name);
    }
    player(name, content) {
        const date = `${moment().format("DD-MM-YYYY hh:mm:ss")}`;
        console.log(chalk.yellow(`[${date}] : [LOGS] ->`), chalk.greenBright(` [${name}] =>  ${content}`));
        this.client.botfunctions.webhooklog("player", content, name);
    }
}
//# sourceMappingURL=Logger.service.js.map