import { Bot } from "../Clients/Bot.client";
export declare class ModuleHandler {
    client: Bot;
    constructor(client: Bot);
    loadModules(): void;
}
