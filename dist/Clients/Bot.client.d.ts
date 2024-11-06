import { Collection, EmbedBuilder, RESTPostAPIChatInputApplicationCommandsJSONBody } from 'discord.js';
import { Api } from '@top-gg/sdk';
import BaseClient from '../Structures/BaseClient.structure.js';
import { ClientFunctions } from '../utils/Functions.utils.js';
import { ShoukakuClient } from '../Modules/Music/Shoukaku.music.js';
import { Queue } from '../Modules/Music/Queue.music.js';
import DataBase from '../Database/manager.database.js';
interface configOptions {
    [key: string]: any;
}
export declare class Bot extends BaseClient {
    color: {
        red: number;
        green: number;
        blue: number;
        yellow: number;
        main: number;
    };
    topGG: Api;
    body: RESTPostAPIChatInputApplicationCommandsJSONBody[];
    botfunctions: ClientFunctions;
    cooldown: Collection<string, any>;
    commands: Collection<string, any>;
    aliases: Collection<string, any>;
    config: configOptions;
    shoukaku: ShoukakuClient;
    queue: Queue;
    db: DataBase;
    constructor();
    embed(): EmbedBuilder;
    private getNodes;
    setupbot(): Promise<void>;
    load247(): Promise<void>;
}
export {};
