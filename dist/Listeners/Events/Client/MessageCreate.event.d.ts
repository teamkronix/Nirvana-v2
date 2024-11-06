import { Message } from "discord.js";
import { Bot } from "../../../Clients/Bot.client.js";
import { Event } from "../../../Structures/index.js";
export default class MessageCreate extends Event {
    constructor(client: Bot, file: string);
    run(_client: Bot, message: Message): Promise<any>;
}
