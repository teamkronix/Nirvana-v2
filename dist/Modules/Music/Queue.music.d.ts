import { Guild } from 'discord.js';
import { LavalinkResponse, Node } from 'shoukaku';
import Dispatcher from './Dispatcher.music.js';
import { Bot } from '../../Clients/Bot.client.js';
export declare class Queue extends Map {
    client: Bot;
    constructor(client: Bot);
    get(guildId: string): Dispatcher;
    set(guildId: string, dispatcher: Dispatcher): this;
    delete(guildId: string): boolean;
    clear(): void;
    create(guild: Guild, voice: any, channel: any, givenNode?: Node): Promise<Dispatcher>;
    search(query: string): Promise<LavalinkResponse | undefined>;
}
