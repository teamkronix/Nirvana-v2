import { Bot } from "../../../../Clients/Bot.client.js";
import { Command } from "../../../../Structures/Command.structure.js";
import Context from "../../../../Structures/Context.structure.js";
export default class Stop extends Command {
    constructor(client: Bot);
    run(client: Bot, ctx: Context): Promise<any>;
}
