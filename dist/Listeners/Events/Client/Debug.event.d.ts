import { Bot } from '../../../Clients/Bot.client.js';
import Event from '../../../Structures/Event.structure.js';
export default class Debug extends Event {
    constructor(client: Bot, file: string);
    run(_client: Bot, args: any): Promise<void>;
}
