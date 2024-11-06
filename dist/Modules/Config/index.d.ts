import Module from "../../Structures/Module.structure.js";
import { Bot } from "../../Clients/Bot.client.js";
export default class ConfigModule extends Module {
    constructor(client: Bot, file: any);
    /**
     * Function for loading the module
     */
    load(): Promise<any>;
    unload(): Promise<any>;
}
