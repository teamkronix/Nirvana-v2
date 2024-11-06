import { Bot } from "../../../Clients/Bot.client.js";
import Event from "../../../Structures/Event.structure.js";
export default class NodeRaw extends Event {
    constructor(client: Bot, file: string);
    run(message: any): Promise<void>;
}
