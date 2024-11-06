import { Command } from '../../../../Structures/Command.structure.js';
import { Bot } from '../../../../Clients/Bot.client.js';
import Context from '../../../../Structures/Context.structure.js';
import { JsonDB } from 'node-json-db';
declare const db: JsonDB;
export { db };
export default class Afk extends Command {
    constructor(client: Bot);
    run(client: Bot, ctx: Context, args: string[]): Promise<any>;
}
