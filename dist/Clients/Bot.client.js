import { Collection, GatewayIntentBits, EmbedBuilder } from 'discord.js';
import { Api } from '@top-gg/sdk';
import BaseClient from '../Structures/BaseClient.structure.js';
import { EventListener } from '../Handlers/Event.handler.js';
import { ClientFunctions } from '../utils/Functions.utils.js';
const gib = GatewayIntentBits;
import config from '../config.json' with { type: 'json' };
import { ShoukakuClient } from '../Modules/Music/Shoukaku.music.js';
import { Queue } from '../Modules/Music/Queue.music.js';
import DataBase from '../Database/manager.database.js';
import GuildSchema from '../Database/Schemas/Guild.schema.js';
import { ModuleHandler } from '../Handlers/Module.handler.js';
const options = {
    failIfNotExists: true,
    // shards: getInfo().SHARD_LIST,
    // shardCount: getInfo().TOTAL_SHARDS,
    allowedMentions: {
        parse: ['roles', 'users'],
        repliedUser: false,
    },
    intents: [
        gib.Guilds,
        gib.GuildVoiceStates,
        gib.GuildMessages,
        gib.GuildMembers,
        gib.GuildMessageTyping,
        gib.MessageContent
    ]
};
export class Bot extends BaseClient {
    color = {
        red: 0xd3e7f3,
        green: 0xd3e7f3,
        blue: 0xd3e7f3,
        yellow: 0xd3e7f3,
        main: 0xd3e7f3,
    };
    topGG = new Api(config.topggapi, this);
    body = [];
    botfunctions = new ClientFunctions(this);
    cooldown = new Collection();
    commands = new Collection();
    aliases = new Collection();
    config;
    shoukaku;
    queue = new Queue(this);
    db;
    constructor() {
        super(options);
        this.config = config;
        this.db = new DataBase(this);
        this.setupbot();
    }
    embed() {
        return new EmbedBuilder();
    }
    async getNodes() {
        const params = new URLSearchParams({
            ssl: 'false',
            version: 'v4',
            format: 'shoukaku',
        });
        const res = await fetch(`https://lavainfo-api.deno.dev/nodes?${params.toString()}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const nodes = await res.json();
        return nodes;
    }
    async setupbot() {
        const nodes = this.config.nodes;
        // console.log(nodes)
        this.shoukaku = new ShoukakuClient(this, nodes);
        await new EventListener(this).loadEvents();
        await new ModuleHandler(this).loadModules();
    }
    async load247() {
        this.logger.log('24/7', 'Loading all 24/7 data for all guilds...');
        const data = await GuildSchema.find({});
        if (!data)
            return;
        data.forEach(async (guild) => {
            if (guild._247.isEnabled) {
                const player = this.queue.get(guild.id);
                if (!player) {
                    const presentguild = await this.guilds.fetch(guild.guildId).catch(err => { });
                    const voice = await this.channels.fetch(guild._247.voice_id).catch(err => { });
                    const text = await this.channels.fetch(guild._247.text_id).catch(() => { });
                    if (presentguild && voice && text) {
                        const p = await this.queue.create(presentguild, voice, text);
                    }
                }
            }
        });
        this.logger.log('24/7', 'Loaded all 24/7 Guilds');
    }
}
//# sourceMappingURL=Bot.client.js.map