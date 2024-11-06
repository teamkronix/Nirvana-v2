import { Bot } from "../../../Clients/Bot.client.js";
import Event from '../../../Structures/Event.structure.js';
import { Guild } from "discord.js";
export default class GuildCreate extends Event {
    constructor(client: Bot, file: string);
    run(_client: Bot, guild: Guild): Promise<void>;
}
