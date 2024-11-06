import { type Guild } from "discord.js";
import { Bot } from "../../../Clients/Bot.client";
import Event from '../../../Structures/Event.structure.js';
export default class GuildDelete extends Event {
    constructor(client: Bot, file: string);
    run(_client: Bot, guild: Guild): Promise<void>;
}
