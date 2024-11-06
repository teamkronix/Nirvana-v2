export default class Logger {
    private client;
    constructor(client: any);
    error(error: string, content: string): void;
    warn(error: string, content: string): void;
    debug(name: string, content: string): void;
    event(name: string, content: string): void;
    log(name: string, content: string): void;
    command(name: string, content: string): void;
    node(name: string, content: string): void;
    player(name: string, content: string): void;
}
