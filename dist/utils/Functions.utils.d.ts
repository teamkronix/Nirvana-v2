import { User, Message } from "discord.js";
import { Bot } from "../Clients/Bot.client.js";
import Context from "../Structures/Context.structure.js";
export declare class ClientFunctions {
    private client;
    constructor(client: Bot);
    /**
     * @param webhook - "command" | "error" | "node" | "event" | "player" | "misc" | "warn" | "logs"
     * @param msg - string
     */
    webhooklog(webhook: "command" | "error" | "node" | "event" | "player" | "misc" | "warn" | "logs", msg: string, title?: string): Promise<void>;
    formatBytes(bytes: number, decimals?: number): string;
    formatTime(ms: number): string;
    parseTime(string: string): number;
    progressBar(current: number, total: number, size?: number): string;
    paginate(client: Bot, ctx: Context, embed: any[]): Promise<void>;
    chunk(array: any[], size: number): any[];
    getUser(ctx: {
        guild: {
            members: {
                fetch: (arg0: any) => any;
            };
        };
    }, mention: string): any;
    getGlobalUser(ctx: {
        guild: {
            members: {
                fetch: (arg0: any) => any;
            };
        };
    }, mention: string): Promise<User>;
    getImgUrlFromAttachment(msg: Message): string;
}
