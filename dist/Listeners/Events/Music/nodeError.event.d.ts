import { Bot } from "../../../Clients/Bot.client.js";
import Event from "../../../Structures/Event.structure.js";
export default class NodeError extends Event {
    constructor(client: Bot, file: string);
    run(node: string, error: string): Promise<void>;
}
