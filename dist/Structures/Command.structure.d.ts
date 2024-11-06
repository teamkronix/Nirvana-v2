import { ApplicationCommandOption, PermissionResolvable } from "discord.js";
import { Bot } from "../Clients/Bot.client.js";
interface CommandOptions {
    name: string;
    description?: {
        content: string;
        usage: string;
        examples: string[];
    };
    aliases?: string[];
    cooldown?: number;
    args?: boolean;
    vote?: boolean;
    isPremium?: boolean;
    player?: {
        voice: boolean;
        dj: boolean;
        active: boolean;
        djPerm: string | null;
    };
    permissions?: {
        dev: boolean;
        client: string[] | PermissionResolvable;
        user: string[] | PermissionResolvable;
    };
    slashCommand?: boolean;
    options?: ApplicationCommandOption[];
    category?: string;
}
export declare class Command {
    client: Bot;
    name: string;
    description: {
        content: string | null;
        usage: string | null;
        examples: string[] | null;
    };
    aliases: string[];
    cooldown: number;
    args: boolean;
    vote: boolean;
    isPremium: boolean;
    premiumTier: "silver" | "gold" | "platinum" | "none";
    player: {
        voice: boolean;
        dj: boolean;
        active: boolean;
        djPerm: string | null;
    };
    permissions: {
        dev: boolean;
        client: string[] | PermissionResolvable;
        user: string[] | PermissionResolvable;
    };
    slashCommand: boolean;
    options: ApplicationCommandOption[];
    category: string | null;
    constructor(client: Bot, options: CommandOptions);
    run(_client: Bot, _message: any, _args: string[]): Promise<any>;
}
export {};
