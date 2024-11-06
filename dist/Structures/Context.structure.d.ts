import { APIInteractionGuildMember, ChatInputCommandInteraction, CommandInteraction, DMChannel, Guild, GuildMember, GuildMemberResolvable, GuildTextBasedChannel, Message, PartialDMChannel, TextChannel, User } from "discord.js";
import { Bot } from "../Clients/Bot.client.js";
export default class Context {
    ctx: CommandInteraction | Message;
    interaction: CommandInteraction | null;
    message: Message | null;
    id: string;
    channelId: string;
    client: Bot;
    author: User | null;
    channel: PartialDMChannel | GuildTextBasedChannel | TextChannel | DMChannel | null;
    guild: Guild | null;
    createdAt: Date;
    createdTimestamp: number;
    member: GuildMemberResolvable | GuildMember | APIInteractionGuildMember | null;
    args: any[];
    msg: any;
    constructor(ctx: ChatInputCommandInteraction | Message, args: any[]);
    get isInteraction(): boolean;
    setArgs(args: any[]): void;
    sendMessage(content: any): Promise<Message>;
    editMessage(content: any): Promise<Message>;
    sendDeferMessage(content: any): Promise<Message>;
    sendFollowUp(content: any): Promise<void>;
    get deferred(): boolean | Promise<any>;
}
