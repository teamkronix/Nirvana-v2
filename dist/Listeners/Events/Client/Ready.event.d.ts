import { Bot } from '../../../Clients/Bot.client.js';
import Event from '../../../Structures/Event.structure.js';
export default class Ready extends Event {
    constructor(client: Bot, file: string);
    run(): Promise<void>;
}
