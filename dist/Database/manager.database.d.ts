import { Bot } from '../Clients/Bot.client.js';
import Caching from '../Services/Caching.service.js';
import Context from '../Structures/Context.structure.js';
export default class DataBase {
    client: Bot;
    cache: Caching;
    constructor(client: any);
    private cacheEventHandler;
    getPrefix(gId: string): Promise<string>;
    hasNoPrefix(uId: string): Promise<boolean>;
    addNoPrefix(uId: any): Promise<boolean>;
    delNoPrefix(uId: any): Promise<boolean>;
    setPrefix(gId: string, pre: string): Promise<void>;
    deletePrefix(gId: string): Promise<void>;
    blacklist(type: string, Id: string, action: string, ctx: Context): Promise<any>;
    isBlacklisted(userid: any, guildid: any): Promise<boolean>;
    checkPremium(gId: string): Promise<boolean>;
    checkDjRole(guildid: string): Promise<string>;
    getUser(uId: string): Promise<any>;
    get247(guildId: string): Promise<boolean>;
    set247(voiceId: string, channelId: string, ctx: Context, action: string): Promise<any>;
    ignore(guildid: string, channelid: string, ctx: Context, action: string): Promise<any>;
}
