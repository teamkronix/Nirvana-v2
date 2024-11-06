import { NodeOption, Shoukaku } from "shoukaku";
import { Bot } from "../../Clients/Bot.client.js";
export declare class ShoukakuClient extends Shoukaku {
    [x: string]: any;
    client: Bot;
    constructor(client: Bot, lavanodes: NodeOption[]);
}
