import { Command } from "../../../../Structures/Command.structure.js";
import { Bot } from "../../../../Clients/Bot.client.js";
import Context from "../../../../Structures/Context.structure.js";
export default class Nowplaying extends Command {
    constructor(client: Bot);
    run(client: Bot, ctx: Context): Promise<any>;
}
