import { Bot } from "../../../../Clients/Bot.client.js";
import { Command } from "../../../../Structures/Command.structure.js";
import Context from "../../../../Structures/Context.structure.js";
export default class _247 extends Command {
    constructor(client: Bot);
    run(client: Bot, ctx: Context, args: string[]): Promise<any>;
}
