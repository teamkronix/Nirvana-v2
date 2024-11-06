import { Bot } from "../../../Clients/Bot.client.js";
import Event from "../../../Structures/Event.structure.js";
export default class NodeDestroy extends Event {
    constructor(client: Bot, file: string);
    run(node: string, code: number, reason: string): Promise<void>;
}
