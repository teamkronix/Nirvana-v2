import { Bot } from "../../../Clients/Bot.client.js";
import Event from "../../../Structures/Event.structure.js";
export default class NodeDisconnect extends Event {
    constructor(client: Bot, file: string);
    run(node: string): Promise<void>;
}
