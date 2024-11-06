import { AutocompleteInteraction, CommandInteraction } from 'discord.js';
import Event from '../../../Structures/Event.structure.js';
import { Bot } from '../../../Clients/Bot.client.js';
export default class InteractionCreate extends Event {
    constructor(client: Bot, file: string);
    run(client: Bot, interaction: CommandInteraction | AutocompleteInteraction): Promise<any>;
}
